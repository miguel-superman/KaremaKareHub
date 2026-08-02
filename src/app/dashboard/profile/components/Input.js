export default function Input({
    label,
    placeholder,
    value,
    onChange,
    required=false
}){


return (

<div className="space-y-2">


<label className="
text-sm
font-medium
text-slate-700
">

{label}

{required && (

<span className="text-red-500 ml-1">
*
</span>

)}

</label>


<input

className="
border
rounded-xl
p-3
w-full
focus:outline-none
focus:ring-2
focus:ring-emerald-500
"

placeholder={placeholder}

value={value || ""}

onChange={onChange}

required={required}

/>


</div>

);


}