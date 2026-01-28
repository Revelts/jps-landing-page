/**
 * Form Tracking Hook
 * 
 * Provides automatic form interaction tracking
 * Tracks: form_start, form_submit, form errors
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackFormStart, trackFormSubmit } from '@/lib/analytics/dataLayer';
import type { FormStartEvent, FormSubmitEvent } from '@/types/analytics';

interface UseFormTrackingOptions {
  formName: string;
  formId: string;
  formType: FormStartEvent['form_type'];
}

export function useFormTracking({
  formName,
  formId,
  formType,
}: UseFormTrackingOptions) {
  const hasStartedRef = useRef(false);

  /**
   * Track form start (first interaction)
   * Call this on first input focus or change
   */
  const trackStart = useCallback(() => {
    if (!hasStartedRef.current) {
      trackFormStart({
        form_name: formName,
        form_id: formId,
        form_type: formType,
      });
      hasStartedRef.current = true;
    }
  }, [formName, formId, formType]);

  /**
   * Track form submission
   * Call this on form submit handler
   * 
   * @param success Whether submission was successful
   * @param error Optional error message
   */
  const trackSubmit = useCallback(
    (success: boolean, error?: string) => {
      trackFormSubmit({
        form_name: formName,
        form_id: formId,
        form_type: formType,
        form_success: success,
        form_error: error,
      });
    },
    [formName, formId, formType]
  );

  /**
   * Reset tracking state (useful for multi-step forms)
   */
  const resetTracking = useCallback(() => {
    hasStartedRef.current = false;
  }, []);

  return {
    trackStart,
    trackSubmit,
    resetTracking,
  };
}

/**
 * Example usage in a form component:
 * 
 * ```tsx
 * const { trackStart, trackSubmit } = useFormTracking({
 *   formName: 'Contact Form',
 *   formId: 'contact-form',
 *   formType: 'contact',
 * });
 * 
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   try {
 *     await submitForm(data);
 *     trackSubmit(true);
 *   } catch (error) {
 *     trackSubmit(false, error.message);
 *   }
 * };
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input onFocus={trackStart} />
 *   </form>
 * );
 * ```
 */
