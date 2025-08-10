"use client";
import { useEffect, useRef, useCallback } from "react";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
	const ref = useRef<HTMLDialogElement | null>(null);

	const closeViaBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === e.currentTarget) onClose();
	};

	const handleBackdropKey = useCallback(
		(e: React.KeyboardEvent<HTMLDialogElement>) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClose();
			}
		},
		[onClose],
	);

	if (!open) return null;

	return (
		<dialog
			ref={ref}
			className="modalOverlay"
			aria-modal="true"
			onClick={closeViaBackdrop}
			onKeyDown={handleBackdropKey}
		>
			{children}
		</dialog>
	);
}
