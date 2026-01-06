import {
  useApplyCoupon,
  useDeccrement,
  useIncrement,
  usercartItem,
  useRemoveCart,
} from "@/hooks/useapi";
import { useState } from "react";
import { Link } from "react-router";

const AddToCart = ({ form, deliveryamount }) => {
  const guestId = localStorage.getItem("guestId");
  const { data, isPending, isError } = usercartItem(guestId);
  const incrementmutation = useIncrement();
  const decrementmutation = useDeccrement();
  const removemutation = useRemoveCart();
  const applyCouponMutation = useApplyCoupon();
  // coupon state
  const [coupon, setcoupon] = useState("");

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>Something went wrong</h1>;

  const cart = data?.data?.data;
  const items = cart?.items || [];

  const totalQuantity = cart?.totalproduct || 0;
  const totalPrice = cart?.totalAmountOfWholeProduct || 0;

  // handleIncrement
  const handleIncrement = (id) => {
    incrementmutation.mutate(id);
  };

  // handleDecrement
  const handleDecrement = (id) => {
    decrementmutation.mutate(id);
  };

  // handleRemove
  const handleRemove = (id) => {
    removemutation.mutate(id);
  };
  // handleApplyCoupon
  const handleApplyCoupon = () => {
    const CouponPayload = {
      user: localStorage.getItem("user") || null,
      guestId: localStorage.getItem("guestId") || null,
      coupon: coupon.trim(),
    };
    applyCouponMutation.mutate(CouponPayload);
  };

  return (
    <div className="lg:max-w-5xl max-lg:max-w-2xl mx-auto bg-white p-4">
      <div
        className={
          form == "checkout"
            ? "grid grid-rows-2  gap-6"
            : "grid  lg:grid-cols-3 gap-6"
        }
      >
        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 bg-gray-100 p-6 rounded-md">
          <h3 className="text-lg font-semibold text-slate-900">Your Cart</h3>
          <hr className="border-gray-300 mt-4 mb-8" />

          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-8">
              {items.map((item) => {
                const productData = item.variant || item.product;

                return (
                  <div
                    key={item._id}
                    className="grid sm:grid-cols-3 items-center gap-4"
                  >
                    {/* Image + Info */}
                    <div className="sm:col-span-2 flex gap-6">
                      <div className="w-24 h-24 bg-white p-2 rounded-md">
                        <img
                          src={productData?.image?.[0]}
                          alt="product"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div>
                        <h4 className="text-[15px] font-semibold text-slate-900">
                          {productData?.variantName || productData?.name}
                        </h4>

                        <p className="text-xs text-gray-500 mt-1">
                          Color: {item.color}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {item.size}
                        </p>
                        {form !== "checkout" && (
                          <div>
                            {/* Quantity UI */}
                            <div className="flex items-center gap-3 mt-4">
                              <button
                                disabled={decrementmutation.isPending}
                                onClick={() => handleDecrement(item._id)}
                                className="w-8 h-8 flex items-center justify-center border rounded-md text-lg"
                              >
                                −
                              </button>

                              <span className="text-sm font-medium">
                                {item.quantity}
                              </span>

                              <button
                                disabled={incrementmutation.isPending}
                                onClick={() => handleIncrement(item._id)}
                                className="w-8 h-8 flex items-center justify-center border rounded-md text-lg"
                              >
                                +
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              disabled={removemutation.isPending}
                              onClick={() => handleRemove(item._id)}
                              className="mt-3 text-xs text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="sm:ml-auto text-right">
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>

                      <p className="text-[15px] font-semibold text-slate-900">
                        ₹{item.unitTotalPrice + deliveryamount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div
          className={
            form == "checkout"
              ? "bg-gray-100 rounded-md p-6 md:sticky top-0 h-max col-span-2"
              : "bg-gray-100 rounded-md p-6 md:sticky top-0 h-max "
          }
        >
          <h3 className="text-lg font-semibold text-slate-900">
            Order Details
          </h3>
          <hr className="border-gray-300 mt-4 mb-8" />

          <ul className="text-slate-600 font-medium space-y-4">
            <li className="flex text-sm">
              Total Items
              <span className="ml-auto font-semibold text-slate-900">
                {totalQuantity}
              </span>
            </li>

            {deliveryamount > 0 && (
              <li className="flex text-sm">
                Delivery Charge
                <span className="ml-auto font-semibold text-slate-900">
                  {deliveryamount}
                </span>
              </li>
            )}

            <li className="flex text-sm">
              Total Price
              <span className="ml-auto font-semibold text-slate-900">
                ₹{totalPrice + deliveryamount}
              </span>
            </li>
          </ul>

          {form !== "checkout" && (
            <div>
              <div className="mt-8 space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium"></button>

                <Link
                  to={"/checkout"}
                  className="w-full block border border-gray-300 py-2.5 rounded-md text-sm font-medium"
                >
                  Checkout
                </Link>
              </div>

              <div className="mt-6">
                <p className="text-slate-900 text-sm font-medium mb-2">
                  Do you have a promo code?
                </p>

                <div className="flex border border-blue-600 rounded-md overflow-hidden">
                  <input
                    onChange={(e) => setcoupon(e.target.value)}
                    value={coupon}
                    disabled={cart.discountType != null}
                    type="text"
                    placeholder="Promo code"
                    className="w-full px-4 py-2.5 text-sm outline-none"
                  />

                  {cart.discountType != null ? (
                    <button className="bg-green-600 hover:bg-green-600 px-4 text-white text-sm">
                      Taken
                    </button>
                  ) : (
                    <button
                      disabled={applyCouponMutation.isPending}
                      onClick={handleApplyCoupon}
                      className="bg-blue-600 hover:bg-blue-700 px-4 text-white text-sm"
                    >
                      {applyCouponMutation.isPending ? "loading .." : "Apply"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
