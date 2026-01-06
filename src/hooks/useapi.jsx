import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

// get all user/guest cart item
export const usercartItem = (id) => {
  return useQuery({
    queryKey: ["usercartitem"],
    queryFn: async () => {
      try {
        return await api.get("/cart/getusercart", {
          params: {
            guestId: id,
          },
        });
      } catch (error) {
        console.log("error from get product", error);
      }
    },
    enabled:!!id
  });
};

// crearte sub category
export const useIncrement = () => {
    const queryClient = useQueryClient();
  return useMutation({
    queryKey: ["incrementCart"],
    mutationFn: (id) => {
      return api.post(
        "/cart/increment",
        {
          itemId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onError: (error, onMutateResult) => {
      console.log(`cart increment error  ${error}`);
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries(["usercartitem"]);
      console.log('cart increment  sucessfully' , data);
    },
  
  });
};


// crearte sub category
export const useDeccrement = () => {
    const queryClient = useQueryClient();
  return useMutation({
    queryKey: ["decrementCart"],
    mutationFn: (id) => {
      return api.post(
        "/cart/decrement",
        {
          itemId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onError: (error) => {
      console.log(`cart decrement error  ${error}`);
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries(["usercartitem"]);
      console.log("cart decrement  sucessfully", data);
    },
  
  });
};

export const useRemoveCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    queryKey: ["removecart"],
    mutationFn: (id) => {
      return api.post(
        "/cart/remove-cart",
        {
          itemId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onError: (error) => {
      console.log(`cart remove error  ${error}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["usercartitem"]);
      console.log("cart remove  sucessfully", data);
    },
  });
};

// apply coupon
export const useApplyCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    queryKey: ["applycoupon"],
    mutationFn: (data) => {
      return api.post("/cart/applycoupon", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error) => {
      console.log(`apply coupon error  ${error}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["usercartitem"]);
      console.log("apply coupon   sucessfully", data);
    },
  });
};

// get all delivery charge
export const useralldeliverycharge = () => {
  return useQuery({
    queryKey: ["deliveryCharge"],
    queryFn: async () => {
      try {
        return await api.get("/deliverycharge/getall-delivarycharge");
      } catch (error) {
        console.log("deliveryCharge product", error);
      }
    },
  });
};

// create an order
export const useorder = () => {
  return useMutation({
    queryKey: ["order"],
    mutationFn: (value) => {
      return api.post("/order/create-order", value, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error) => {

      console.log(` crate order error ${error}`);
    },
    onSuccess: (data) => {
      console.log('order placed sucessfully' , data);
    },
  
  });
};
