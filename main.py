from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

app = FastAPI()

# Templates folder
templates = Jinja2Templates(directory="templates")

# Home page (UI)
#@app.get("/")
@app.get("/home", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Optional API (future use)
@app.get("/cakes")
def get_cakes():
    return [
        {"name": "Chocolate Cake", "price": 500},
        {"name": "Red Velvet", "price": 600}
    ]

# Optional: Order endpoint (future)
@app.post("/order")
def create_order(order: dict):
    print("Order received:", order)
    return {"message": "Order placed successfully 🎉"}