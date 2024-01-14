import prismadb from "@/lib/prismadb";
import { format } from 'date-fns';
import { ColorsClient } from "./components/client";
import { ColorColumn } from "./components/columns";

const ColorsPage = async ({
    params
} : {
    params : { colorId: string}
}) => {

    const colors = await prismadb.color.findMany({
        where: {
            id: params.colorId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data = {formattedColors} />
            </div>
        </div>
    )
}

export default ColorsPage;