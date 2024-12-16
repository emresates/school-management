"use client";
import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Username must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  gender: z.enum(["male", "female"], {
    message: "Gender is required",
  }),
  img: z.instanceof(File, { message: "Image is required!" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">Create a new teacher</h1>
      <span className="text-xs font-medium text-gray-400">
        Authentication Information
      </span>
      <div className="flex flex-wrap justify-between gap-4">
        <Input
          label="Username"
          register={register}
          name="username"
          defaultValue={data?.username}
          error={errors.username}
        />
        <Input
          label="Email"
          register={register}
          name="email"
          defaultValue={data?.email}
          error={errors.email}
        />
        <Input
          label="Password"
          register={register}
          name="password"
          type="password"
          defaultValue={data?.password}
          error={errors.password}
        />
      </div>

      <span className="text-xs font-medium text-gray-400">
        Personal Information
      </span>
      <div className="flex flex-wrap justify-between gap-4">
        <Input
          label="First Name"
          register={register}
          name="firstName"
          defaultValue={data?.firstName}
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          register={register}
          name="lastName"
          defaultValue={data?.lastName}
          error={errors.lastName}
        />
        <Input
          label="Phone"
          register={register}
          name="phone"
          defaultValue={data?.phone}
          error={errors.phone}
        />
        <Input
          label="Address"
          register={register}
          name="address"
          defaultValue={data?.address}
          error={errors.address}
        />
        <Input
          label="BloodType"
          register={register}
          name="bloodType"
          defaultValue={data?.bloodType}
          error={errors.bloodType}
        />
        <Input
          label="Birthday"
          register={register}
          name="birthday"
          defaultValue={data?.birthday}
          error={errors.birthday}
          type="date"
        />
        <div className="flex w-full flex-col gap-2 md:w-1/4">
          <label htmlFor="" className="text-xs text-gray-400">
            Gender
          </label>
          <select
            className="w-full rounded-md border p-2 text-sm outline-none"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          {errors?.gender?.message && (
            <span className="text-xs text-red-500">
              {errors?.gender?.message.toString()}
            </span>
          )}
        </div>
        <div className="flex w-full justify-center flex-col gap-2 md:w-1/4">
          <label
            htmlFor="image"
            className="flexic cursor-pointer gap-2 text-xs text-gray-400"
          >
            <Image src="/images/upload.png" alt="" width={20} height={20} />
            <span>Upload a photo</span>
          </label>
          <input
            id="image"
            type="file"
            {...register("img")}
            className="hidden"
          />
          {errors?.gender?.message && (
            <span className="text-xs text-red-500">
              {errors?.gender?.message.toString()}
            </span>
          )}
        </div>
      </div>

      <button className="rounded-md bg-blue-400 p-2 text-white">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
