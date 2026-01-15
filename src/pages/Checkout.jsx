import { useorder, useralldeliverycharge } from "@/hooks/useapi";
import { useEffect, useState } from "react";
import AddToCart from "./AddtoCart";

const Checkout = () => {
    const [deliveryamount , setdeliveryamount] = useState(0)
  const { data, isPending } = useralldeliverycharge();
  const ordermutation = useorder()

  const deliveryCharges = data?.data?.data || [];

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
    country: "Bangladesh",
    deliveryZone: "inside_dhaka",
    deliveryCharge: "",
    paymentMethod: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =  () => {
    const payload = {
      user: localStorage.getItem("user") || null,
      guestId: localStorage.getItem("guestId") || null,
      shippinfo: {
        firstName: formData.firstName,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
        country: formData.country,
        deliveryZone: formData.deliveryZone,
      },
      paymentMethod: formData.paymentMethod,
      deliveryCharge: formData.deliveryCharge,
    };

    ordermutation.mutate(payload)
    
  };

 
  useEffect(() => {
    if (formData.deliveryCharge) {
      const charge = deliveryCharges.find(
        (item) => item._id == formData.deliveryCharge
      );
      setdeliveryamount(Math.ceil(charge.amount));
    }
  }, [formData.deliveryCharge]);
     if (isPending) return <h1>Loading...</h1>;
  return (
    <div className="bg-purple-50 sm:px-8 px-4 py-6">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* LEFT — FORM */}
        <div className="bg-white p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>

          <div className="grid lg:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              className="input  px-3 py-2 bg-amber-50"
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              className="input  px-3 py-2 bg-amber-50"
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              className="input  px-3 py-2 bg-amber-50"
              onChange={handleChange}
            />
            <input
              name="address"
              placeholder="Address"
              className="input  px-3 py-2 bg-amber-50"
              onChange={handleChange}
            />
          </div>

          {/* DELIVERY CHARGE SELECT */}
          <div className="mt-6">
            <label className="text-sm font-medium block mb-2">
              Delivery Method
            </label>

            <select
              name="deliveryCharge"
              className="w-full px-4 py-2 border rounded-md"
              onChange={handleChange}
            >
              <option value="">Select Delivery</option>
              {deliveryCharges.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} — ${Math.round(item.amount)}
                </option>
              ))}
            </select>
          </div>

          {/* PAYMENT */}
          <div className="mt-6">
            <div class="mt-12">
              <h2 class="text-xl text-slate-900 font-semibold mb-6">Payment</h2>
              <div class="grid gap-4 grid-cols-2">
                <div class="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        class="w-5 h-5 cursor-pointer"
                        id="card"
                        defaultValue={"online"}
                        onChange={handleChange}
                      />
                      <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                        <img
                          src="https://readymadeui.com/images/visa.webp"
                          class="w-12"
                          alt="card1"
                        />
                        <img
                          src="https://readymadeui.com/images/american-express.webp"
                          class="w-12"
                          alt="card2"
                        />
                        <img
                          src="https://readymadeui.com/images/master.webp"
                          class="w-12"
                          alt="card3"
                        />
                      </label>
                    </div>
                  </div>
                  <p class="mt-4 text-sm text-slate-500 font-medium">
                    Pay with your debit or credit card
                  </p>
                </div>
                <div class="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div>
                    <div class="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        class="w-5 h-5 cursor-pointer"
                        id="paypal"
                        defaultValue={"cod"}
                        onChange={handleChange}
                      />
                      <label
                        for="paypal"
                        class="ml-4 flex gap-2 cursor-pointer"
                      >
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                  <p class="mt-4 text-sm text-slate-500 font-medium">
                    Pay with your paypal account
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={ordermutation.isPending}
            onClick={handleSubmit}
            className="mt-8 w-full bg-blue-600 text-white py-2.5 rounded-md"
          >
            {ordermutation.isPending ? "loading ..." : "Complete Purchase"}
          </button>
        </div>

        {/* RIGHT — CART SUMMARY */}
        <AddToCart form="checkout" deliveryamount={deliveryamount} />
      </div>
    </div>
  );
};

export default Checkout;
