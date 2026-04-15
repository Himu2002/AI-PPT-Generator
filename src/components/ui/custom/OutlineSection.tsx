import { Skeleton } from '../skeleton';

type Props = {
    loading: boolean;
}

const OutlineSection = ({ loading }: Props) => {
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-xl'>Sliders outline</h2>
            {loading &&
                <div>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <Skeleton key={index} className="h-15 w-full mb-4 rounded-2xl" />
                    ))}

                </div>
            }
        </div>
    )
}

export default OutlineSection