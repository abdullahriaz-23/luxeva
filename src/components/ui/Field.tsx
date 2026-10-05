import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface BaseProps {
  label: string
  error?: string
  hint?: ReactNode
  className?: string
}

function Wrapper({ id, label, error, hint, className, required, children }: BaseProps & { id: string; required?: boolean; children: ReactNode }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="eyebrow text-taupe">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-taupe">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function TextField({ label, error, hint, className, id, required, ...rest }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Wrapper id={fid} label={label} error={error} hint={hint} className={className} required={required}>
      <input
        id={fid}
        className="field-input"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fid}-error` : hint ? `${fid}-hint` : undefined}
        required={required}
        {...rest}
      />
    </Wrapper>
  )
}

export function SelectField({
  label,
  error,
  hint,
  className,
  id,
  required,
  children,
  ...rest
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Wrapper id={fid} label={label} error={error} hint={hint} className={className} required={required}>
      <select id={fid} className="field-input" aria-invalid={error ? true : undefined} aria-describedby={error ? `${fid}-error` : undefined} required={required} {...rest}>
        {children}
      </select>
    </Wrapper>
  )
}

export function TextAreaField({ label, error, hint, className, id, required, ...rest }: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Wrapper id={fid} label={label} error={error} hint={hint} className={className} required={required}>
      <textarea
        id={fid}
        className="field-input min-h-36 resize-y"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fid}-error` : undefined}
        required={required}
        {...rest}
      />
    </Wrapper>
  )
}
