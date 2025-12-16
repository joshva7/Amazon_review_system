import { useContext } from "react";
import { Providerdata } from "../../globalcontext/Prodatesetprov";

const Cards = () => {
  const { data } = useContext(Providerdata);

  if (!data) return null;

  return (
    <div className="mx-auto mt-8">
      <div className="border-2 mx-50 py-4 rounded-[5px] border-gray-500">
        <ul className="flex gap-4 justify-around font-roboto font-bold text-gray-700">
          <li>Product</li>
          <li>Product Name</li>
          <li>Avg Rating</li>
          <li>Reviews</li>
        </ul>
      </div>

      <div className="mt-4">
        <img src={data.productImage} alt="product" />
        <span>{data.sentiment}</span>

        <div>
          <span>Neutral</span>
          <p>{data.neutral}</p>

          <span>Negative</span>
          <p>{data.negative}</p>

          <span>Positive</span>
          <p>{data.positive}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
