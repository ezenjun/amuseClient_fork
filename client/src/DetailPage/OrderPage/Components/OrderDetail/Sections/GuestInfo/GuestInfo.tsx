import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
	female = "female",
	male = "male",
	other = "other",
}

interface IFormInput {
	firstName: string;
	gender: GenderEnum;
}
type Props = {};

const GuestInfo = (props: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

	return (
		<>hi</>
		// <form onSubmit={handleSubmit(onSubmit)}>
		// 	<label>First Name</label>
		// 	<input
		// 		{...register("firstName", { required: true })}
		// 		aria-invalid={errors.firstName ? "true" : "false"}
		// 	/>
		// 	{errors.firstName?.type === "required" && (
		// 		<p role="alert">First name is required</p>
		// 	)}
		// 	<label>Gender Selection</label>
		// 	<select {...register("gender")}>
		// 		<option value="female">female</option>
		// 		<option value="male">male</option>
		// 		<option value="other">other</option>
		// 	</select>
		// 	<input type="submit" />
		// </form>
	);
};

export default GuestInfo;
