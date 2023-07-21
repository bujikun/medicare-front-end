"use client"

import Image from "next/image";

const ImageViewer = ({src,name}) => {
  return (
    <div>
      <Image
        //maxW={{ base: "100%", sm: "300px" }}
        src={src}
        alt={`${name??''}`}
        width={300}
        height={300}
        loader={loader}
      />
    </div>
  );
}

const loader = ({ src }) => {
  return src;
};
export default ImageViewer