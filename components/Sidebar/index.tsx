import { menuItems, role } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Büyütülebilir küçültülebilir olmalı
// Responsive e göre düzenlenmeli

const Sidebar = () => {
  return (
    <div className="h-full border-r p-xl shadow-sm">
      <Link href="/" className="flexicjc gap-2 tablet:justify-start">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="h-8 w-8"
        />
        <span className="hidden tablet:block">ITA School</span>
      </Link>
      <div className="mt-lg text-sm">
        {menuItems.map((item, index) => (
          <div key={index} className="flexisjc flex-col gap-2">
            <p className="hidden py-4 tablet:block">{item?.title}</p>

            {item?.items?.map((subItem, index) => {
              if (subItem?.visible.includes(role)) {
                return (
                  <Link
                    href={subItem?.href}
                    key={index}
                    className="flexicjc w-full gap-2 rounded-md p-2 transition-all hover:bg-gray-200 tablet:justify-start"
                  >
                    <Image
                      src={subItem?.icon}
                      alt={subItem?.label}
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                    <span className="hidden tablet:block">
                      {subItem?.label}
                    </span>
                  </Link>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
