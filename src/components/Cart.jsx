function Cart({
  items,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  totalItems,
  totalPrice,
}) {
  return (
    <aside className="cart">
      <h2>Cart</h2>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>
                $ {item.price} each
              </p>
            </div>

            <div className="quantity-controls">
              <button onClick={() => onDecreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
            </div>

            <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}

      <div className="summary">
        <p>Total items: {totalItems}</p>
        <p>Total: $ {totalPrice}</p>
      </div>
    </aside>
  );
}

export default Cart;