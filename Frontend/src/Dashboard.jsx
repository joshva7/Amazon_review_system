import { useContext } from "react";
import SentimentPie from "./components/SentimentPie";
import SentimentBar from "./components/SentimentBar";
import { DataContext } from "./Context/Datacontextprovied";
export default function Dashboard() {
    const { data } = useContext(DataContext);

    if (!data) {
        return <p className="text-center mt-6">No analysis data available</p>;
    }

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold text-center">
                Total Reviews Analyzed: {data.total}
            </h2>
            <div className=" flex justify-center items-center flex-col md:flex-row md:gap-20 mt-10">
                <div className='flex flex-col justify-center items-center ms-10 my-10'>
                    {data && (
                        <div>
                            <p className=' text-2xl font-roboto'>Product Reviews:</p>
                            <h2>Negative {data.analysis.negative}</h2>
                            <h2>Neutral {data.analysis.neutral}</h2>
                            <h2>Positive {data.analysis.positive}</h2>
                            <h2>Total {data.analysis.positive + data.analysis.neutral + data.analysis.negative}</h2>
                        </div>
                    )}
                </div>
                <SentimentPie analysis={data.analysis} />
            </div>
            <SentimentBar analysis={data.analysis} />
        </div>
    );
}
