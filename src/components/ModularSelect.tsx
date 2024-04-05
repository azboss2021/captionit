import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ModularSelect = {
  placeholder?: string;
  value?: string;
  onChangeHandler?: () => void;
  setStateFunction?: React.Dispatch<React.SetStateAction<string>>;
  items: { value: string; name: string }[];
};

const ModularSelect = ({
  placeholder,
  value,
  onChangeHandler,
  items,
  setStateFunction,
}: ModularSelect) => {
  if (setStateFunction) {
    const handleNewStateValue = (newValue: string) => {
      setStateFunction(newValue);
    };

    return (
      <Select onValueChange={handleNewStateValue} defaultValue={value}>
        <SelectTrigger className="w-[180px] select-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem value={item.value} key={index}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-[180px] select-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item, index) => (
          <SelectItem value={item.value} key={index}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default ModularSelect;
