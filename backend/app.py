import uvicorn
import feedparser
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {}

@app.get("/substack/{username}")
def get_substack_posts(username: str):
    feed_url = f"https://{username}.substack.com/feed"
    
    feed = feedparser.parse(feed_url)
    if not feed.entries:
        raise HTTPException(status_code=404, detail="No posts found")
        
    posts = []
    for entry in feed.entries:
        content = entry.get("content", [{}])[0].get("value", "")
        contentText = BeautifulSoup(content, "html.parser").get_text()
        post = {
            "title": entry.title,
            "link": entry.link,
            "published": entry.published,
            "summary": entry.summary,
            "content": contentText
        }
        posts.append(post)

    return {"posts": posts}

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)