'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Lock,
  BookOpen,
  Info,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  CheckCircle2,
  Zap,
  Star,
  Award,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CANONICAL_TRACK_IDS, CanonicalTrackId, normalizeTrackId } from '@/lib/entitlements/config';
import { TrackProduct, TRACK_METADATA } from '@/lib/payments/products';

type CheckoutState =
  | 'idle'
  | 'creating'
  | 'checkout_open'
  | 'verifying'
  | 'success'
  | 'cancelled'
  | 'error';

export default function PricingPage() {
  const {
    user,
    isOwner,
    tier,
    validUntil,
    trackGrants,
    canAccessTrack,
    refreshEntitlements,
  } = useAuth();

  const [products, setProducts] = useState<TrackProduct[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<CanonicalTrackId>('ml');
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isReconciling, setIsReconciling] = useState<boolean>(false);

  // Load product catalog from server
  useEffect(() => {
    fetch('/api/payments/catalog')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.warn('Failed to load product catalog:', err);
      });
  }, []);

  // Helper to load Razorpay Checkout script dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Launch One-Time Lifetime Checkout
  const handlePurchaseLifetime = async (trackId: CanonicalTrackId | 'all' = 'all') => {
    if (!user) {
      window.location.href = '/login?redirectTo=/pricing';
      return;
    }

    setCheckoutState('creating');
    setStatusMessage('Preparing secure one-time order with Razorpay...');

    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId,
          productId: trackId === 'all' ? 'all_courses_lifetime' : `${trackId}_lifetime`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCheckoutState('error');
        setStatusMessage(data.error || 'Failed to initiate order.');
        return;
      }

      if (
        !data.keyId ||
        String(data.keyId).includes('placeholder') ||
        !data.orderId ||
        String(data.orderId).startsWith('order_test_')
      ) {
        setCheckoutState('error');
        setStatusMessage('Razorpay gateway keys are not configured on the server.');
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setCheckoutState('error');
        setStatusMessage('Failed to load secure payment checkout script. Please check your network connection.');
        return;
      }

      setCheckoutState('checkout_open');
      setStatusMessage('Please complete your payment in the secure Razorpay window.');

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'AzurLearn',
        description: data.trackTitle || 'All Courses Lifetime Pass',
        order_id: data.orderId,
        handler: async (response: any) => {
          setCheckoutState('verifying');
          setStatusMessage('Verifying payment signature and provisioning lifetime entitlement...');

          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                trackId,
                productId: trackId === 'all' ? 'all_courses_lifetime' : `${trackId}_lifetime`,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setCheckoutState('success');
              setStatusMessage(`Payment verified! Lifetime access to ${data.trackTitle} is now unlocked.`);
              await refreshEntitlements();
            } else {
              setCheckoutState('error');
              setStatusMessage(verifyData.error || 'Verification failed. Please reconcile below if charged.');
            }
          } catch (err: any) {
            setCheckoutState('error');
            setStatusMessage('Network error during verification. You may safely reconcile your payment below.');
          }
        },
        modal: {
          ondismiss: () => {
            setCheckoutState('cancelled');
            setStatusMessage('Checkout was closed. No charges were completed.');
          },
        },
        prefill: {
          email: user.email || '',
        },
        theme: {
          color: '#4f46e5',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (failure: any) => {
        setCheckoutState('error');
        setStatusMessage(
          failure?.error?.description ||
            failure?.error?.reason ||
            'Payment failed in Razorpay checkout. Please try again.'
        );
      });
      rzp.open();
    } catch (err: any) {
      setCheckoutState('error');
      setStatusMessage(err.message || 'An unexpected error occurred.');
    }
  };

  // Launch Monthly Subscription Checkout
  const handleSubscribeMonthly = async (trackId: CanonicalTrackId | 'all' = 'all') => {
    if (!user) {
      window.location.href = '/login?redirectTo=/pricing';
      return;
    }

    setCheckoutState('creating');
    setStatusMessage('Preparing monthly subscription checkout with Razorpay...');

    try {
      const res = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId,
          productId: trackId === 'all' ? 'all_courses_monthly' : `${trackId}_monthly`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCheckoutState('error');
        setStatusMessage(data.error || 'Failed to initiate subscription.');
        return;
      }

      if (
        !data.keyId ||
        String(data.keyId).includes('placeholder') ||
        !data.subscriptionId ||
        String(data.subscriptionId).startsWith('sub_test_')
      ) {
        setCheckoutState('error');
        setStatusMessage('Razorpay subscription keys are not configured on the server.');
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setCheckoutState('error');
        setStatusMessage('Failed to load secure payment checkout script.');
        return;
      }

      setCheckoutState('checkout_open');
      setStatusMessage('Please authorize your monthly subscription in the Razorpay window.');

      const options = {
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: 'AzurLearn',
        description: data.trackTitle || 'All Courses Monthly Plan',
        handler: async (response: any) => {
          setCheckoutState('verifying');
          setStatusMessage('Verifying subscription authorization and updating access period...');

          try {
            const verifyRes = await fetch('/api/payments/verify-subscription', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                trackId,
                productId: trackId === 'all' ? 'all_courses_monthly' : `${trackId}_monthly`,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setCheckoutState('success');
              setStatusMessage(`Subscription active! Access to ${data.trackTitle} is now granted.`);
              await refreshEntitlements();
            } else {
              setCheckoutState('error');
              setStatusMessage(verifyData.error || 'Subscription verification failed.');
            }
          } catch (err: any) {
            setCheckoutState('error');
            setStatusMessage('Network error during subscription verification.');
          }
        },
        modal: {
          ondismiss: () => {
            setCheckoutState('cancelled');
            setStatusMessage('Subscription checkout was closed. No charges were made.');
          },
        },
        prefill: {
          email: user.email || '',
        },
        theme: {
          color: '#4f46e5',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (failure: any) => {
        setCheckoutState('error');
        setStatusMessage(
          failure?.error?.description ||
            failure?.error?.reason ||
            'Payment failed in Razorpay checkout. Please try again.'
        );
      });
      rzp.open();
    } catch (err: any) {
      setCheckoutState('error');
      setStatusMessage(err.message || 'An unexpected error occurred.');
    }
  };

  // Reconcile delayed transactions
  const handleReconcile = async () => {
    setIsReconciling(true);
    try {
      const res = await fetch('/api/payments/reconcile', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.reconciled) {
        setCheckoutState('success');
        setStatusMessage(data.message || 'Payment reconciled! Entitlement updated.');
        await refreshEntitlements();
      } else {
        setStatusMessage(data.message || 'No pending captured payments were found to reconcile.');
      }
    } catch (err: any) {
      setStatusMessage('Failed to communicate with reconciliation service.');
    } finally {
      setIsReconciling(false);
    }
  };

  const selectedMeta = TRACK_METADATA[selectedTrack];
  const currentTrackGrant = trackGrants[selectedTrack];
  const hasLifetimeTrack = currentTrackGrant?.sourceType === 'lifetime_purchase' && currentTrackGrant.status === 'active';
  const hasMonthlyTrack = currentTrackGrant?.sourceType === 'monthly_subscription' && currentTrackGrant.status === 'active';
  const individualLifetimeProduct = products.find((p) => p.id === `${selectedTrack}_lifetime`);
  const individualMonthlyProduct = products.find((p) => p.id === `${selectedTrack}_monthly`);

  // Platform-wide all-access status
  const hasLifetimeAllAccess = tier === 'all_access' && !validUntil;
  const hasMonthlyAllAccess = tier === 'all_access' && !!validUntil && new Date(validUntil) > new Date();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-World AI &amp; Machine Learning Academy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Invest in Your Engineering Career
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-light">
          Unlock unrestricted access to all 13 curriculum tracks, 131 modules, 417 interactive lessons, visualizers, and the AI Tutor. Choose lifetime ownership or flexible monthly billing.
        </p>
      </div>

      {/* Owner Access Notice Banner */}
      {isOwner && (
        <div className="rounded-2xl border border-purple-200 dark:border-purple-800 bg-purple-50/80 dark:bg-purple-950/40 p-5 flex items-start gap-3 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-purple-950 dark:text-purple-100">
            <p className="font-bold">Verified Platform Owner Account</p>
            <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
              Your session is authenticated as the designated Platform Owner. You have unrestricted, permanent access to all 13 curriculum tracks, interactive visualizers, AI Tutor, and capstone projects without requiring payment.
            </p>
          </div>
        </div>
      )}

      {/* Checkout Status Toast / Alert */}
      {checkoutState !== 'idle' && (
        <div
          className={`rounded-2xl border p-4 sm:p-5 flex items-start gap-3 transition-all ${
            checkoutState === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
              : checkoutState === 'error'
              ? 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100'
              : checkoutState === 'cancelled'
              ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100'
              : 'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-100'
          }`}
        >
          {checkoutState === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : checkoutState === 'error' ? (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm space-y-1 flex-1">
            <p className="font-semibold capitalize">{checkoutState.replace('_', ' ')}</p>
            <p className="opacity-90">{statusMessage}</p>
          </div>
          {(checkoutState === 'error' || checkoutState === 'cancelled') && (
            <button
              onClick={() => setCheckoutState('idle')}
              className="text-xs px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* FEATURED ALL-COURSES PLANS GRID                           */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* CARD 1: Monthly All Courses Plan — ₹99 / month */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider">
                Monthly Subscription
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Cancel Anytime
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                All Courses Monthly
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Full curriculum access with flexible, automatic monthly renewal.
              </p>
            </div>

            <div className="pt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-slate-100">₹99</span>
                <span className="text-xs font-semibold text-slate-500">/ month</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Billed monthly via Razorpay Subscriptions</p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span><strong>All 13 Curriculum Tracks:</strong> ML, DL, LLMs, Agents, MLOps &amp; more</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span><strong>131 Modules &amp; 417 Lessons</strong> with code sandboxes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span><strong>Full AI Tutor Context:</strong> Instant debugging and Q&amp;A</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span><strong>Interactive Visualizers</strong> &amp; Capstone Workspaces</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span>Pause or cancel anytime in 1 click</span>
              </li>
            </ul>
          </div>

          <div>
            {isOwner ? (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold cursor-default border border-purple-200 dark:border-purple-800"
              >
                Included in Owner Access
              </button>
            ) : hasLifetimeAllAccess ? (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold cursor-default"
              >
                Not Needed (Lifetime Active)
              </button>
            ) : hasMonthlyAllAccess ? (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold cursor-default border border-emerald-200 dark:border-emerald-800"
              >
                ✓ Active Monthly Subscription
              </button>
            ) : (
              <button
                onClick={() => handleSubscribeMonthly('all')}
                disabled={checkoutState === 'creating' || checkoutState === 'verifying'}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md hover:shadow-violet-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Subscribe for ₹99/mo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* CARD 2: Lifetime All Courses Pass — ₹399 (POPULAR / BEST VALUE) */}
        <div className="rounded-3xl border-2 border-indigo-600 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden transform md:-translate-y-2">
          {/* Top Banner Ribbon */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-violet-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Best Value • Save 80%</span>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3 text-indigo-600 fill-current" />
                <span>Lifetime Pass</span>
              </span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Permanent Access
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                All Courses Lifetime
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pay once and own the complete engineering curriculum forever. Never pay again.
              </p>
            </div>

            <div className="pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 dark:text-slate-100">₹399</span>
                <span className="text-xs font-semibold text-slate-400 line-through">₹4,999</span>
                <span className="text-xs font-semibold text-slate-500 ml-1">one-time</span>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                Single payment · Permanent access · Never expires
              </p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Unrestricted Lifetime Access</strong> to all 13 current tracks</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>All 131 Modules &amp; 417 Lessons:</strong> Foundations to Agent Swarms</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Unlimited AI Tutor Assistance:</strong> Deep learning debugging</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>All Future Curriculum Updates:</strong> Free track expansions</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Capstone Workspaces &amp; Production Serving Labs</strong></span>
              </li>
            </ul>
          </div>

          <div>
            {isOwner ? (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold cursor-default border border-purple-200 dark:border-purple-800"
              >
                Included in Owner Access
              </button>
            ) : hasLifetimeAllAccess ? (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold cursor-default border border-emerald-200 dark:border-emerald-800"
              >
                ✓ Owned (Lifetime Access Active)
              </button>
            ) : (
              <button
                onClick={() => handlePurchaseLifetime('all')}
                disabled={checkoutState === 'creating' || checkoutState === 'verifying'}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Get Lifetime Access — ₹399</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* CARD 3: Free Tier — ₹0 */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow relative">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Free Forever
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                No Card Needed
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                Foundations Tier
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore foundational concepts and memory models across core languages.
              </p>
            </div>

            <div className="pt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-slate-100">₹0</span>
                <span className="text-xs font-semibold text-slate-500">/ forever</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Immediate access on account creation</p>
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>ML Module 0:</strong> Foundations &amp; Learning Taxonomy</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>NumPy Module 0:</strong> Array Memory Layouts &amp; Striding</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Pandas Module 0:</strong> Series &amp; Ingestion Architecture</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Python Module 0:</strong> CPython Execution Model</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Java Module 0:</strong> JVM Internal Architecture</span>
              </li>
            </ul>
          </div>

          <div>
            <Link
              href="/curriculum/module-0"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Free Modules</span>
            </Link>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* CURRICULUM SYLLABUS & TRACK EXPLORER                      */}
      {/* ========================================================= */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Explore All 13 Curriculum Tracks Included in Your Pass
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select any track below to preview what is covered inside. All 13 tracks unlock instantly with either plan.
            </p>
          </div>

          {/* Reconciliation Button */}
          <button
            onClick={handleReconcile}
            disabled={isReconciling}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReconciling ? 'animate-spin text-indigo-600' : ''}`} />
            <span>Reconcile Pending Payment</span>
          </button>
        </div>

        {/* Track Pills Carousel / Selector */}
        <div className="flex flex-wrap gap-2">
          {CANONICAL_TRACK_IDS.map((tId) => {
            const isSelected = selectedTrack === tId;
            const meta = TRACK_METADATA[tId];
            const grant = trackGrants[tId];
            const isAccessible = isOwner || hasLifetimeAllAccess || hasMonthlyAllAccess || grant?.status === 'active';

            return (
              <button
                key={tId}
                onClick={() => setSelectedTrack(tId)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <span>{meta.title}</span>
                {isAccessible && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'}`}>
                    Available
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Track Detail Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold uppercase">
                  Curriculum Track
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedMeta.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                {selectedMeta.description}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                {individualLifetimeProduct?.isActive
                  ? `Standalone Lifetime: ${individualLifetimeProduct.displayPrice}`
                  : 'Included in ₹99/mo & ₹399 Lifetime All-Access Pass'}
                {individualMonthlyProduct?.isActive
                  ? ` · Standalone Monthly: ${individualMonthlyProduct.displayPrice}`
                  : ''}
              </p>
            </div>

            <div className="shrink-0">
              {isOwner || hasLifetimeAllAccess || hasMonthlyAllAccess || hasLifetimeTrack || hasMonthlyTrack ? (
                <Link
                  href={`/curriculum/${selectedTrack}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Learning Now</span>
                </Link>
              ) : (
                <button
                  onClick={() => handlePurchaseLifetime('all')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
                >
                  <span>Unlock in ₹399 Lifetime Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}