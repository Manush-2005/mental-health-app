from typing import List, Dict, TypedDict, Annotated, Literal
from langgraph.graph import StateGraph, END, add_messages
from langchain_google_genai import ChatGoogleGenerativeAI
from tavily import TavilyClient
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain.prompts import ChatPromptTemplate
from pydantic import BaseModel
from langchain.output_parsers import PydanticOutputParser



class VideoState(TypedDict):
    topic: str
    search_query: str
    video_links: list[dict]
    messages: Annotated[list, add_messages]




llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key="API_key"
)
tailvy = TavilyClient(api_key="API_key")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
async def analyze_node(state: VideoState) -> VideoState:
    prompt = (
        f"Given the question title '{state['topic']}' from leetcode, generate a concise search query "
        "to find solution YouTube video to this question. Include 'youtube' in the query."
    )
    res = await llm.ainvoke(prompt)
    return {
        **state,
        "search_query": res.content,
        "messages": state["messages"] + [res]
    }

async def analyze_node(state: VideoState) -> VideoState:
    prompt = (
        f"Given the query on how to control your emotion of '{state['topic']}' generate a concise search query "
        "to find YouTube video to this query. Include 'youtube' in the query."
    )
    res = await llm.ainvoke(prompt)
    return {
        **state,
        "search_query": res.content,
        "messages": state["messages"] + [res]
    }



async def search_node(state: VideoState) -> VideoState:
    query = state["search_query"]
    search_results = tailvy.search(
        query=query,
        search_depth="basic",
        max_results=5,
        include_domains=["youtube.com"]
    )
    video_links = [
        {"url": result["url"], "title": result["title"]}
        for result in search_results["results"]
    ]
    return {
        **state,
        "video_links": video_links
    }

workflow = StateGraph(VideoState)
workflow.add_node("analyze", analyze_node)
workflow.add_node("search", search_node)
workflow.add_edge("analyze", "search")
workflow.add_edge("search", END)
workflow.set_entry_point("analyze")
graph = workflow.compile()

async def get_video_links(topic: str) -> list[dict]:
    initial_state = {"topic": topic, "search_query": "", "video_links": [], "messages": []}
    result = await graph.ainvoke(initial_state)
    return result["video_links"]


@app.get("/recommend")
async def recommend_videos(topic: str):
    if not topic:
        raise HTTPException(status_code=400, detail="Topic is required")
    try:
        video_links = await get_video_links(topic)
        if not video_links:
            return {"message": f"No videos found for topic '{topic}'", "videos": []}
        return {"topic": topic, "videos": video_links}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")