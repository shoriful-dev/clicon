import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
export const useallproduct = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: async ()=> {
        try {
            return await api.get("/product/getall-product");
        } catch (error) {
            console.log('error from get product' ,error);
        }
    }
  });

};


// get single product
export const usesingleproduct = (slug) => {
  return useQuery({
    queryKey: ["singleproduct"],
    queryFn: async () => {
      try {
        return await api.get("/product/single-product", {
          params: {
            slug: slug,
          },
        });
      } catch (error) {
        console.log("error from get product", error);
      }
    },
    enabled:!!slug
  });
};



// crearte sub category
export const useAddToCart = () => {
  return useMutation({
    queryKey: ["addToCart"],
    mutationFn: (value) => {
      return api.post("cart/addtocart", value, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error, onMutateResult) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      console.log('Add to cart sucessfully' , data);
    },
  
  });
};