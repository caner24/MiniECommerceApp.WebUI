export default function FormInput({
  setVariable,
  nameInput,
  onChange,
  typeInput,
  labelText,
}) {
  return (
    <div>
      <label
        htmlFor={nameInput}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {labelText}
      </label>
      <div className="mt-2">
        <input
          value={setVariable}
          onChange={onChange}
          id={nameInput}
          name={nameInput}
          type={typeInput}
          autoComplete={nameInput}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
