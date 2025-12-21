import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const BookingForm = () => {
  const { id } = useParams(); // product id
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axiosSecure.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);

      setValue("quantity", res.data.minOrder);
    });
  }, [id, axiosSecure, setValue]);

  const quantity = watch("quantity") || 0;
  const totalPrice = product ? quantity * product.price : 0;

  const onSubmit = async (data) => {
    const orderData = {
      productId: product._id,
      productTitle: product.title,
      price: product.price,
      quantity: Number(data.quantity),
      totalPrice,
      email: user.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      notes: data.notes,
      payment: product.payment,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);

      // ✅ PAYMENT DECISION HERE
      if (product.payment === "Cash on Delivery") {
        Swal.fire("Success", "Order placed successfully", "success");
        navigate("/dashboard/my-orders");
      } else {
        // Online payment required
        navigate(`/payment/${res.data.insertedId}`);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20">
        <LoadingSpinner></LoadingSpinner>
      </p>
    );

  return (
    <div className="">
      <h2 className="text-3xl font-bold  text-green-800 text-center p-8">
        Order Booking Form
      </h2>
      <div className="max-w-2xl mx-auto p-6 bg-green-100  shadow rounded ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-center gap-3"
        >
          <input value={user.email} readOnly className="input " />

          <input value={product.title} readOnly className="input" />

          <input value={`$${product.price}`} readOnly className="input" />

          <input
            {...register("firstName", { required: true })}
            placeholder="First Name"
            className="input"
          />
          {errors.firstName && <p className="text-red-500">Required</p>}

          <input
            {...register("lastName", { required: true })}
            placeholder="Last Name"
            className="input "
          />
          {errors.lastName && <p className="text-red-500">Required</p>}

          <input
            type="number"
            {...register("quantity", {
              required: true,
              min: product.minOrder,
              max: product.quantity,
            })}
            className="input"
          />
          {errors.quantity && (
            <p className="text-red-500">
              Quantity must be between {product.minOrder} and {product.quantity}
            </p>
          )}

          <input value={`Total: $${totalPrice}`} readOnly className="input" />

          <input
            {...register("phone", { required: true })}
            placeholder="Contact Number"
            className="input"
          />

          <textarea
            {...register("address", { required: true })}
            placeholder="Delivery Address"
            className="textarea"
          />

          <textarea
            {...register("notes")}
            placeholder="Any Instructions?"
            className="textarea"
          />

          <button onClick={()=>navigate("/payment")}
            className="px-8 py-2 bg-green-800 rounded-xl text-white font-bold border-2 hover:border-red-800 hover:text-red-800
              hover:bg-white"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
