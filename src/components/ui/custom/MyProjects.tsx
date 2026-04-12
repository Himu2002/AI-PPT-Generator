import { FolderCode } from 'lucide-react'
import { Button } from '../button'
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

const MyProjects = () => {
    return (
        <div className='mx-32 mt-20 '>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl'>My Projects</h2>
                <Button>+ Create New project</Button>
            </div>
            <div>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FolderCode />
                        </EmptyMedia>
                        <EmptyTitle>No Projects Yet</EmptyTitle>
                        <EmptyDescription>
                            You haven&apos;t created any projects yet. Get started by creating
                            your first project.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent className="flex-row justify-center gap-2">
                        <Button>Create Project</Button>
                        {/* <Button variant="outline">Import Project</Button> */}
                    </EmptyContent>
                    <Button
                        variant="link"
                        asChild
                        className="text-muted-foreground"
                        size="sm">
                    </Button>
                </Empty>
            </div>
        </div>
    )
}

export default MyProjects