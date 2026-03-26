import uvicorn
import feedparser
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from bs4 import BeautifulSoup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
            "content": contentText
        }
        posts.append(post)

    return {"posts": posts}

# Serve the frontend dist directory statically
frontend_dist = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(request: Request, full_path: str):
        # Ignore substack api calls so they don't get caught
        if full_path.startswith("substack/"):
            raise HTTPException(status_code=404, detail="Not found")

        # Allow requests to specific files in dist
        potential_file = os.path.join(frontend_dist, full_path)
        if os.path.isfile(potential_file):
            return FileResponse(potential_file)
        
        # Fallback to index.html for React Router
        index_file = os.path.join(frontend_dist, "index.html")
        if os.path.isfile(index_file):
            return FileResponse(index_file)
        return {"message": "Frontend not found"}
else:
    @app.get("/")
    def root():
        return {"message": "API is running, but frontend is not built. Run 'make build-frontend'."}

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)