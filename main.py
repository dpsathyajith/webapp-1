from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI()

# Templates folder (must exist at project root)
templates = Jinja2Templates(directory="templates")

# Home page (UI)
@app.get("/home", response_class=HTMLResponse)
def home(request: Request):
    # index.html must be inside ./templates/
    return templates.TemplateResponse("index.html", {"request": request})

# Example API endpoint
@app.get("/cakes")
def get_cakes():
    return [
        {"name": "Chocolate Cake", "price": 500},
        {"name": "Red Velvet", "price": 600}
    ]

# Define a request body model for orders
class Order(BaseModel):
    item: str
    quantity: int

# Order endpoint
@app.post("/order")
def create_order(order: Order):
    print("Order received:", order.dict())
    return {
        "message": "Order placed successfully 🎉",
        "order": order.dict()
    }
