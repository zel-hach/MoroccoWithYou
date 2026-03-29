"use client";

import { Modal } from "@mantine/core";
import React, { useState } from "react";
import { api } from "@/lib/api";
import type { StoredUser } from "@/lib/auth";

export type ServiceItem = {
  id: number;
  name: string;
  description: string;
  label: string;
  pricePublic: number;
  commissionAmount: number;
  unit: string;
  provider?: { name: string; city: string; category: string } | null;
};

type Props = {
  opened: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  user: StoredUser | null;
  onBooked: () => void;
};

export default function BookingModal({ opened, onClose, service, user, onBooked }: Props) {
  const [totalPrice, setTotalPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (service) {
      setTotalPrice(String(service.pricePublic));
      setError(null);
    }
  }, [service]);

  const submit = async () => {
    if (!service || !user) {
      setError("Please log in again.");
      return;
    }
    const price = Number(totalPrice);
    if (!Number.isFinite(price) || price <= 0) {
      setError("Enter a valid price.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post("/bookings", {
        userId: user.id,
        serviceId: service.id,
        totalPrice: price,
        commissionTotal: Number(service.commissionAmount) || 0,
        paymentIntent: `web_${Date.now()}`,
      });
      onBooked();
      onClose();
    } catch {
      setError("Booking failed. Check the API and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   <Modal
  opened={opened}
  onClose={onClose}
  centered
  zIndex={400}
  title={
    <span className="text-xl font-bold text-white">
      Confirm booking
    </span>
  }
  overlayProps={{
    backgroundOpacity: 0.1,
    blur: 4,
  }}
  styles={{
    content: {
      width: "min(780px, 95vw)",
      minHeight: 320,
      maxHeight: "90vh",
    },
    body: {
      maxHeight: "calc(90vh - 6rem)",
      overflowY: "auto",
    },
  }}
  classNames={{
    content:
      "bg-slate-900 rounded-2xl shadow-2xl border border-white/10",
    header:
      "bg-slate-900 border-b border-white/10 px-6 py-4",
    title: "text-white",
    close:
      "text-gray-400 hover:text-white transition",
    body:
      "px-6 py-4 text-gray-300",
  }}
>
      {service && (
        <div className="space-y-4 text-slate-200">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#9aea30]">Service</p>
            <p className="font-medium">{service.name}</p>
            {service.provider && (
              <p className="text-sm text-slate-400">
                {service.provider.name} · {service.provider.city}
              </p>
            )}
          </div>
          <p className="text-sm text-slate-400">{service.description}</p>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Total ({service.unit})
            </label>
            <input
              type="number"
              min={1}
              step={0.01}
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none focus:border-[#9aea30]/50"
              />
          </div>
          {!user && (
            <p className="text-sm text-amber-300">You must be logged in to book.</p>
          )}
          {error && <p className="text-sm text-red-300">{error}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
              >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading || !user}
              onClick={submit}
              className="rounded-xl bg-[#9aea30] px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/30 disabled:opacity-50"
            >
              {loading ? "Booking…" : "Confirm"}
            </button>
          </div>
        </div>
      )}
      </Modal>
    </>
  );
}
