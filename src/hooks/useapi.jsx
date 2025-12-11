import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
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
