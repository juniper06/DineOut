"use client";
import React from 'react'
import EditProfileForm from "@/components/form/EditProfileForm";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function EditProfileDialog() {
  
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button
							className="absolute -bottom-16 right-0 w-28"
							size="lg"
							variant="primary">
							Edit
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] bg-cornsilk-500">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>All fields are optional</DialogDescription>
						</DialogHeader>
						<EditProfileForm closeDialog={() => setOpen(false)}/>
					</DialogContent>
				</Dialog>
  )
}
