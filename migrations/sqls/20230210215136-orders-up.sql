
CREATE TYPE choose  AS ENUM('active','complete');

CREATE TABLE  IF NOT EXISTS  orders(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_status choose,
    CONSTRAINT FK_orders_product_users FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE ON  UPDATE CASCADE
);
