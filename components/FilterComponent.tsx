import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
    placeholder: string;
    value: string;
    setOpen?: (value: boolean) => void  // Remove | undefined
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const FilterComponent = ({ placeholder, value, onChange, setOpen }: Props) => {
    return (
        <div className="flex flex-row gap-2 bg-white">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                className="pl-10 w-[450px]"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {/* <div>
                <Button className='' type='button' onClick={() => setOpen?.(true)}>New</Button>
            </div> */}

        </div>
    )
}

export default FilterComponent