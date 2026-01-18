import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Information() {
    return (
        <div className="grid gap-8 py-8">
            <header className="mb-2">
                <h1 className="text-3xl font-semibold tracking-tight">Personal information</h1>
                <p className="mt-2 text-muted-foreground">Manage your profile, shipping address and payment methods.</p>
            </header>

            <NeoCard>
                <form onSubmit={savePersonal} className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <h2 className="text-lg font-semibold">User information</h2>
                        <p className="text-sm text-muted-foreground">Details that appear on your account and receipts.</p>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="fullName">Full name</label>
                        <NeoInput id="fullName" value={personal.fullName} onChange={(e)=>setPersonal({ ...personal, fullName: e.target.value })} placeholder="Alex Kim" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="email">Email</label>
                        <NeoInput id="email" type="email" value={personal.email} onChange={(e)=>setPersonal({ ...personal, email: e.target.value })} placeholder="you@comma.app" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="phone">Phone</label>
                        <NeoInput id="phone" value={personal.phone} onChange={(e)=>setPersonal({ ...personal, phone: e.target.value })} placeholder="+82 10-0000-0000" />
                    </div>
                    <div className="md:col-span-2"><DaisyButton variant="primary" loading={loading}>Save user info</DaisyButton></div>
                </form>
            </NeoCard>

            <NeoCard>
                <form onSubmit={saveShipping} className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <h2 className="text-lg font-semibold">Shipping address</h2>
                        <p className="text-sm text-muted-foreground">Default delivery destination for orders.</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="mb-1 block text-sm font-medium" htmlFor="line1">Address line 1</label>
                        <NeoInput id="line1" value={shipping.line1} onChange={(e)=>setShipping({ ...shipping, line1: e.target.value })} placeholder="123 Comma Street" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="mb-1 block text-sm font-medium" htmlFor="line2">Address line 2</label>
                        <NeoInput id="line2" value={shipping.line2} onChange={(e)=>setShipping({ ...shipping, line2: e.target.value })} placeholder="Apartment, suite, etc." />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="city">City</label>
                        <NeoInput id="city" value={shipping.city} onChange={(e)=>setShipping({ ...shipping, city: e.target.value })} placeholder="Seoul" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="state">State / Province</label>
                        <NeoInput id="state" value={shipping.state} onChange={(e)=>setShipping({ ...shipping, state: e.target.value })} placeholder="Gyeonggi" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="postal">Postal code</label>
                        <NeoInput id="postal" value={shipping.postalCode} onChange={(e)=>setShipping({ ...shipping, postalCode: e.target.value })} placeholder="00000" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="country">Country</label>
                        <NeoInput id="country" value={shipping.country} onChange={(e)=>setShipping({ ...shipping, country: e.target.value })} placeholder="South Korea" />
                    </div>
                    <div className="md:col-span-2"><DaisyButton variant="primary" loading={loading}>Save address</DaisyButton></div>
                </form>
            </NeoCard>

            <NeoCard>
                <form onSubmit={savePayment} className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <h2 className="text-lg font-semibold">Payment method</h2>
                        <p className="text-sm text-muted-foreground">Saved card used for quick checkout.</p>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="cardName">Name on card</label>
                        <NeoInput id="cardName" value={payment.cardName} onChange={(e)=>setPayment({ ...payment, cardName: e.target.value })} placeholder="Alex Kim" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="cardNumber">Card number</label>
                        <NeoInput id="cardNumber" inputMode="numeric" value={payment.cardNumber} onChange={(e)=>setPayment({ ...payment, cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="exp">Expiry</label>
                        <NeoInput id="exp" placeholder="MM/YY" value={payment.exp} onChange={(e)=>setPayment({ ...payment, exp: e.target.value })} />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium" htmlFor="cvc">CVC</label>
                        <NeoInput id="cvc" placeholder="CVC" value={payment.cvc} onChange={(e)=>setPayment({ ...payment, cvc: e.target.value })} />
                    </div>
                    <div className="md:col-span-2"><DaisyButton variant="primary" loading={loading}>Save payment</DaisyButton></div>
                </form>
            </NeoCard>
        </div>
    );
}

export default Information;