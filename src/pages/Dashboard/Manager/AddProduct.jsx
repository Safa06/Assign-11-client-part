// import AddPlantForm from '../../../components/Form/AddPlantForm'

// const AddPlant = () => {
//   return (
//     <div>
//       {/* Form */}
//       <AddPlantForm />
//     </div>
//   )
// }

// export default AddPlant


import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";



const AddProduct = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const productData = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      quantity: Number(data.quantity),
      minOrder: Number(data.minOrder),
      image: data.image,
      images: data.images ? data.images.split(",") : [],
      payment: data.payment,
      showHome: data.showHome || false,
      createdBy: user.email,
    };

    const res = await axios.post("http://localhost:5000/products", productData);

    if (res.data.success) {
      Swal.fire("Success", "Product added successfully", "success");
      reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", { required: true })}
          placeholder="Product Title"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        />

        <select
          {...register("category", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          <option>Shirt</option>
          <option>Pant</option>
          <option>Jacket</option>
          <option>Accessories</option>
        </select>

        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("quantity", { required: true })}
          placeholder="Available Quantity"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("minOrder", { required: true })}
          placeholder="Minimum Order Quantity"
          className="input input-bordered w-full"
        />

        <input
          {...register("image", { required: true })}
          placeholder="Main Image URL"
          className="input input-bordered w-full"
        />

        <input
          {...register("images")}
          placeholder="Extra Image URLs (comma separated)"
          className="input input-bordered w-full"
        />

        <input
          {...register("demoVideo")}
          placeholder="Demo Video Link (optional)"
          className="input input-bordered w-full"
        />

        <select
          {...register("payment", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Payment Mode</option>
          <option>Cash on Delivery</option>
          <option>PayFirst</option>
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("showHome")} />
          Show on Home Page
        </label>

        <button className="btn btn-success w-full">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
