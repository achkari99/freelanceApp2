"use client";







import * as React from "react";



import { FormProvider, useForm, useFormContext, type UseFormRegisterReturn } from "react-hook-form";



import { zodResolver } from "@hookform/resolvers/zod";



import { Button } from "@/components/ui/button";



import { services } from "@/data/services";



import { startProjectSchema, type StartProjectPayload, PROJECT_REPORT_ACCEPTED_EXTENSIONS, PROJECT_REPORT_ACCEPTED_MIME_TYPES, PROJECT_REPORT_MAX_SIZE_BYTES } from "@/lib/validation";







const steps: { id: string; title: string; description: string; fields: (keyof StartProjectPayload)[] }[] = [



  {



    id: "basics",



    title: "Project basics",



    description: "Who should we connect with and who is on the build?",



    fields: ["name", "email", "company", "timeline"]



  },



  {



    id: "focus",



    title: "Focus areas",



    description: "What outcome should your 48H prototype unlock?",



    fields: ["services", "budget", "description", "projectReport"]



  },



  {



    id: "collaboration",



    title: "Collaboration",



    description: "Share any collaboration notes or tools we should join.",



    fields: ["hear", "slackChannel", "slackInvite"]



  }



];

const PROJECT_REPORT_MAX_SIZE_MB = Math.round(PROJECT_REPORT_MAX_SIZE_BYTES / (1024 * 1024));








export function StartProjectForm() {



  const [step, setStep] = React.useState(0);



  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");



  const form = useForm<StartProjectPayload>({



    resolver: zodResolver(startProjectSchema),



    defaultValues: {



      name: "",



      email: "",



      company: "",



      timeline: "",



      services: [],



      budget: "",



      description: "",



      projectReport: null,



      hear: "",



      slackChannel: "",



      slackInvite: true



    }



  });







  const currentStep = steps[step];







  const nextStep = async () => {



    const valid = await form.trigger(currentStep.fields);



    if (!valid) return;



    setStep((prev) => Math.min(prev + 1, steps.length - 1));



  };







  const previousStep = () => setStep((prev) => Math.max(prev - 1, 0));







  const onSubmit = async (payload: StartProjectPayload) => {



    setStatus("submitting");



    try {



            const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("company", payload.company);
      formData.append("timeline", payload.timeline);
      payload.services.forEach((service) => {
        formData.append("services", service);
      });
      formData.append("budget", payload.budget);
      formData.append("description", payload.description);
      if (payload.projectReport) {
        formData.append("projectReport", payload.projectReport);
      }
      if (payload.hear) {
        formData.append("hear", payload.hear);
      }
      if (payload.slackChannel) {
        formData.append("slackChannel", payload.slackChannel);
      }
      formData.append("slackInvite", payload.slackInvite ? "true" : "false");

      const response = await fetch("/api/start-project", {
        method: "POST",
        body: formData
      });



      if (!response.ok) {



        throw new Error("Failed to submit");



      }



      setStatus("success");



      form.reset();



      setStep(0);



    } catch (error) {



      console.error(error);



      setStatus("error");



    } finally {



      setStatus((prev) => (prev === "error" ? "error" : prev === "success" ? "success" : "idle"));



    }



  };







  return (



    <FormProvider {...form}>



      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8"
      >



        <div className="space-y-2">



          <p className="text-xs uppercase tracking-wide text-slate-400">



            Step {step + 1} of {steps.length}



          </p>



          <h2 className="font-display text-2xl text-slate-900 dark:text-white">{currentStep.title}</h2>



          <p className="text-sm text-slate-600 dark:text-slate-300">{currentStep.description}</p>



        </div>



        <div className="grid gap-6 md:grid-cols-2">



          {currentStep.fields.map((field) => (



            <Field key={field} name={field} />



          ))}



        </div>



        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">



          <div className="text-sm text-slate-500 dark:text-slate-300">



            {status === "success" ? "Thanks! The ACH squad will respond within a few hours." : null}



            {status === "error" ? "Something went wrong. Please retry." : null}



          </div>



          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">



            {step > 0 ? (



              <Button type="button" variant="outline" onClick={previousStep} className="w-full sm:w-auto">



                Back



              </Button>



            ) : null}



            {step < steps.length - 1 ? (



              <Button type="button" onClick={nextStep} className="w-full sm:w-auto">



                Continue



              </Button>



            ) : (



              <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">



                {status === "submitting" ? "Sending..." : "Submit brief"}



              </Button>



            )}



          </div>



        </div>



      </form>



    </FormProvider>



  );



}







interface FieldProps {



  name: keyof StartProjectPayload;



}







function Field({ name }: FieldProps) {



  const {



    register,



    formState: { errors },



    watch,



    setValue



  } = useFormContext<StartProjectPayload>();







  const serviceOptions = services.map((service) => service.name);



  const value = watch(name as never);







  switch (name) {



    case "name":



    case "email":



    case "company":



    case "timeline":



    case "budget":



    case "hear":



    case "slackChannel":



      return (



        <InputField
          id={name}
          type={fieldMeta[name]?.type ?? "text"}
          label={labelCopy[name]}
          placeholder={placeholderCopy[name] ?? ""}
          error={errors[name]?.message as string | undefined}
          registration={register(name)}
          autoComplete={fieldMeta[name]?.autoComplete}
          inputMode={fieldMeta[name]?.inputMode}
          enterKeyHint={fieldMeta[name]?.enterKeyHint}
        />



      );



    case "description":



      return (



        <TextareaField



          id={name}



          label={labelCopy[name]}



          placeholder={placeholderCopy[name] ?? ""}



          error={errors[name]?.message as string | undefined}



          registration={register(name)}



        />



      );



    case "projectReport":



      return (



        <ProjectReportField error={errors[name]?.message as string | undefined} />



      );



    case "services":



      return (



        <div className="space-y-2 md:col-span-2">



          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Select focus areas</p>



          <div className="flex flex-wrap gap-2">



            {serviceOptions.map((service) => {



              const active = Array.isArray(value) && value.includes(service);



              return (



                <button



                  key={service}



                  type="button"



                  onClick={() => {



                    const current = new Set(Array.isArray(value) ? value : []);



                    current.has(service) ? current.delete(service) : current.add(service);



                    setValue("services", Array.from(current) as StartProjectPayload["services"], { shouldValidate: true });



                  }}



                  className={`inline-flex items-center rounded-full border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                    active
                      ? "border-sky-500 bg-sky-500/10 text-sky-700 dark:border-sky-300 dark:bg-sky-300/20 dark:text-sky-200"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300"
                  }`}
                  aria-pressed={active}
                >



                  {service}



                </button>



              );



            })}



          </div>



          {errors.services ? <p className="text-xs text-rose-500">{errors.services.message as string}</p> : null}



        </div>



      );



    case "slackInvite":



      return (



        <div className="space-y-2">



          <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">



            <input



              type="checkbox"



              checked={Boolean(value)}



              onChange={(event) => setValue("slackInvite", event.target.checked)}



            />



            Invite ACH to our Slack workspace



          </label>



        </div>



      );



    default:



      return null;



  }



}







function ProjectReportField({ error }: { error?: string }) {
  const { register, setValue, watch } = useFormContext<StartProjectPayload>();
  const file = watch("projectReport");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = React.useState(0);

  const { name, onBlur, ref } = register("projectReport");

  const acceptValue = React.useMemo(
    () => [...PROJECT_REPORT_ACCEPTED_EXTENSIONS, ...PROJECT_REPORT_ACCEPTED_MIME_TYPES].join(","),
    []
  );

  React.useEffect(() => {
    setProgress(file ? 100 : 0);
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setValue("projectReport", selectedFile, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const handleRemove = () => {
    setValue("projectReport", null, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const helperText = `Upload a single PDF, DOC, DOCX, or ZIP (max ${PROJECT_REPORT_MAX_SIZE_MB} MB).`;

  return (
    <div className="space-y-3 md:col-span-2">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="projectReport">
          {labelCopy.projectReport}
        </label>
        <p className="text-sm text-slate-500 dark:text-slate-300">{helperText}</p>
      </div>

      <div
        className={`flex flex-col gap-3 rounded-2xl border-2 border-dashed p-6 transition ${
          error
            ? "border-rose-400 bg-rose-50/70 dark:border-rose-500/80 dark:bg-rose-950/40"
            : "border-slate-200 bg-white/60 dark:border-slate-700 dark:bg-slate-900/40"
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-500"
          >
            Choose file
          </button>
          <span className="text-sm text-slate-500 dark:text-slate-300">Drag & drop or browse your files.</span>
        </div>

        <input
          id="projectReport"
          type="file"
          accept={acceptValue}
          name={name}
          ref={(node) => {
            ref(node);
            inputRef.current = node;
          }}
          onBlur={onBlur}
          onChange={handleFileChange}
          className="sr-only"
        />

        {progress > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Ready to send</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden>
              <div className="h-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : null}

        {file ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-900/10 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-100/10 dark:text-slate-200">
              <span className="truncate" title={file.name}>
                {file.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{formatFileSize(file.size)}</span>
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-sm font-medium text-rose-600 transition hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            >
              Remove
            </button>
          </div>
        ) : null}
      </div>

      {error ? <p className="text-xs text-rose-500">{error}</p> : null}
    </div>
  );
}

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const megabytes = bytes / (1024 * 1024);
  if (megabytes >= 1) {
    return `${megabytes.toFixed(1)} MB`;
  }

  const kilobytes = bytes / 1024;
  if (kilobytes >= 1) {
    return `${Math.round(kilobytes)} KB`;
  }

  return `${bytes} B`;
}
function InputField({
  id,
  label,
  type,
  placeholder,
  error,
  registration,
  autoComplete,
  inputMode,
  enterKeyHint
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  registration: UseFormRegisterReturn;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  enterKeyHint?: React.InputHTMLAttributes<HTMLInputElement>["enterKeyHint"];
}) {



  return (



    <div className="space-y-2">



      <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor={id}>



        {label}



      </label>



      <input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        autoComplete={autoComplete}
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:text-sm"
        {...registration}
      />



      {error ? <p className="text-xs text-rose-500">{error}</p> : null}



    </div>



  );



}







function TextareaField({



  id,



  label,



  placeholder,



  error,



  registration



}: {



  id: string;



  label: string;



  placeholder: string;



  error?: string;



  registration: UseFormRegisterReturn;



}) {



  return (



    <div className="space-y-2 md:col-span-2">



      <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor={id}>



        {label}



      </label>



      <textarea



        id={id}



        rows={5}



        placeholder={placeholder}



        aria-invalid={error ? "true" : "false"}



        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"



        {...registration}



      />



      {error ? <p className="text-xs text-rose-500">{error}</p> : null}



    </div>



  );



}







const fieldMeta: Partial<
  Record<
    keyof StartProjectPayload,
    {
      type?: string;
      autoComplete?: string;
      inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
      enterKeyHint?: React.InputHTMLAttributes<HTMLInputElement>["enterKeyHint"];
    }
  >
> = {
  name: { autoComplete: "name", enterKeyHint: "next" },
  email: { type: "email", autoComplete: "email", inputMode: "email", enterKeyHint: "next" },
  company: { autoComplete: "organization", enterKeyHint: "next" },
  timeline: { enterKeyHint: "next" },
  budget: { inputMode: "numeric", enterKeyHint: "next" },
  hear: { autoComplete: "off", enterKeyHint: "next" },
  slackChannel: { autoComplete: "off", enterKeyHint: "done" }
};

const labelCopy: Record<keyof StartProjectPayload, string> = {



  name: "Your name",



  email: "Email",



  company: "Company or team",



  timeline: "Ideal start timeline",



  services: "Services",



  budget: "Budget range",



  description: "What are you hoping to achieve?",
  projectReport: "Project report",



  hear: "How did you hear about us?",



  slackChannel: "Slack channel (optional)",



  slackInvite: "Slack invite"



};







const placeholderCopy: Partial<Record<keyof StartProjectPayload, string>> = {



  name: "Amal Haddou",



  email: "aa03abm05@gmail.com",



  company: "RightMind Partner Co.",



  timeline: "Within 2 weeks",



  budget: "$10k-$40k",



  description: "We want a 48H prototype for an AI workflow and need a path to scale it.",



  hear: "Referred by RightMind Lab, event, or partner",



  slackChannel: "#ach-collab"



};








