import { useEffect, useState } from "react";

const MultipleVariant = ({ data }) => {
  if (!data) return null;
  const [mainImage, setmainImage] = useState("");
  const [allImage, setallimage] = useState([]);

  useEffect(() => {
    if (data) {
      setmainImage(data.variant[0].image[0]);

      // get all image into variant
      let imageArr = [];
      data.variant.map((item) => {
        imageArr.push(item.image);
      });

      const all = imageArr.flatMap((item) => item);
      setallimage(all);
    }
  }, [data]);

  console.log(allImage);
  return (
    <div>
      <div>
        <div className="flex flex-wrap -mx-4">
          {/* LEFT: IMAGES */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            {/* Main Image */}
            <img
              src={mainImage}
              alt={mainImage}
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 py-4 justify-center overflow-x-auto customscrollbar">
              {allImage.map((img, index) => (
                <img
                onClick={()=> setmainImage(img)}
                  key={index}
                  src={
                    img ||
                    "https://backend.micloglobal.com/uploads/all/RCMti3K4xUevxJFo7g5WI2vVw9US6KvXKb9dHvGg.png"
                  }
                  className="size-16 w-20 h-20 sm:size-20 object-cover rounded-md opacity-60 hover:opacity-100 transition cursor-default"
                />
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
        </div>
      </div>
    </div>
  );
};

export default MultipleVariant;
