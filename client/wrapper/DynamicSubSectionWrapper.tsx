"use client";
import dynamic from "next/dynamic";
const DynamicSubSection = dynamic(
	() => import("../components/0_Home/SubSection"),
	{ ssr: false },
);

interface subSectionProps {
	className?: string;
	setOpenNavProps?: (open: boolean) => void;
}

export default function DynamicSubSectionWrapper(props: subSectionProps) {
	return <DynamicSubSection {...props} />;
}
