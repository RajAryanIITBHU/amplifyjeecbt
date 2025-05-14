"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

// shadcn components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Utility function: deep compare two objects
function areObjectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  )
    return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => areObjectsEqual(obj1[key], obj2[key]));
}

const SettingsLayout = ({ data }) => {
  // Use null as initial state
  
const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [mounted, setMounted] = useState(false);
const router = useRouter()


  // Initialize userData after component mounts to prevent hydration mismatch
  useEffect(() => {
    const {name, phone, dob} = data
    setUserData({name, phone: phone.toString(), dob});
    setMounted(true);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setUserData((prev) => ({ ...prev, dob: date ?? null }));
  };

  const handleSave = async () => {
    if (areObjectsEqual(data, userData)) {
      toast.error("No changes made.");
      return;
    }

    if (userData.phone.length !== 10){
        toast.error("Invalid Phone Number.");
        return;
    }

    const d = userData.dob.split("-")
    if (userData.dob.length !== 10 || d[0].length !== 4 || d[1].length !==2 || d[2].length !== 2){
        toast.error("Invalid Date of Birth Number.");
        return;
    }



    setLoading(true);
    try {
      const res = await fetch("/api/updateUserData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...userData, updated_at: new Date().toISOString()}),
      });

      const result = await res.json();

      await update({
        name: userData.name,
        phone: userData.phone,
        dob: userData.dob,
      });

      if (res.ok) {
        toast.success(result.message || "Settings updated Successfully");
        router.refresh()
      } else {
        toast.error(result.message || "Failed to save data");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Show loading state until client-side hydration is complete
  if (!mounted || !userData) return <div className="mt-10 mx-auto w-fit ">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">User Settings</h2>

      <Card className="w-full">
        <CardContent className="grid gap-6 py-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
              maxLength={10}
            />
          </div>

          {/* DOB */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="dob">Date of Birth (YYYY-MM-DD)</Label>
            <Input
              id="dob"
              name="dob"
              value={userData.dob || ""}
              onChange={handleChange}
              maxLength={10}
              placeholder={"YYYY-MM-DD"}
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={loading || areObjectsEqual(data, userData)}
            className="mt-2"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsLayout;
