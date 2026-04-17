import type { Outline } from '@/workspace/project/outline';
import { Skeleton } from '../skeleton';
import { Button } from '../button';
import { ArrowRight, Edit } from 'lucide-react';
import EditOutlineDialog from './EditOutlineDialog';

type Props = {
    loading: boolean;
    outline?: Outline[];
    handleUpdateOutline: any
}

const OutlineSection = ({ loading, outline, handleUpdateOutline }: Props) => {

    return (
        <div className='mt-7'>
            <h2 className='font-bold text-xl'>Sliders outline</h2>
            {loading &&
                <div>
                    {[1, 2, 3, 4].map((index) => (
                        <Skeleton key={index} className="h-15 w-full mb-4 rounded-2xl" />
                    ))}

                </div>
            }
            <div className='mb-24'>
                {outline?.map((item, index) => (
                    <div key={index} className='bg-white p-3 rounded-xl flex gap-6 items-center border mt-5 justify-between px-6'>
                        <div className='flex gap-6 items-center'>
                            <h2 className='font-bold text-2xl p-5 bg-gray-200 rounded-xl'>{item.slideNo}</h2>
                            <div>
                                <h2 className='font-semibold text-lg'>{item.slidePoint}</h2>
                                <p className='text-gray-600'>{item.outline}</p>
                            </div>
                        </div>
                        <EditOutlineDialog outlineData={item} onUpdate={handleUpdateOutline}>
                            <Button variant={'ghost'} size={'icon-lg'} ><Edit /></Button>
                        </EditOutlineDialog>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default OutlineSection