/** Renderiza el formulario de admisión para interesados. */

import { useEffect } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';

import { useFormState } from '@/lib/hooks';
import { useNotify } from '@/lib/notifications';
import { admisionesSchema } from '@/lib/validation';
import { useAdmisiones } from '../hooks/useAdmisiones';
import type { InteresadoFormData } from '../types/admisiones.types';

interface SolicitudInformacionProps {
  className?: string;
}

const SolicitudInformacion = ({
  className = 'py-14 sm:py-20 bg-zinc-50',
}: SolicitudInformacionProps) => {
  const { state, submitForm, reset } = useAdmisiones();
  const notify = useNotify();

  const form = useFormState(
    { nombre: '', telefono: '', correo: '', institucion: '', evento: '', interes: 'Información general', observaciones: '' },
    admisionesSchema
  );

  const isSubmitting = state.status === 'loading';
  const submitted = state.status === 'success';

  useEffect(() => {
    if (state.status === 'success') {
      notify.success('¡Registro de interés enviado exitosamente!');
    } else if (state.status === 'error' && state.error) {
      notify.error(state.error);
    }
  }, [notify, state.status, state.error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.hasErrors) return;

    const data: InteresadoFormData = {
      nombre: form.values.nombre,
      telefono: form.values.telefono,
      correo: form.values.correo,
      institucion: form.values.institucion,
      evento: form.values.evento as InteresadoFormData['evento'],
      interes: (form.values.interes as InteresadoFormData['interes']) || 'Información general',
      observaciones: form.values.observaciones,
    };

    submitForm(data);
  };

  return (
    <section id="interesados" className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ups-blue mb-6 uppercase tracking-wide">
              Solicita Información
            </h2>
            <div className="w-20 h-1 bg-ups-yellow mb-8"></div>

            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-zinc-700">
              <p>
                Bienvenido al proceso de admisión de la <strong>Carrera de Computación</strong>.
                Estamos listos para guiarte en tu camino hacia convertirte en un profesional de la tecnología.
              </p>
              <p>Al registrar tus datos, recibirás:</p>
              <ul className="list-disc pl-6 space-y-3 text-base">
                <li>Detalles de la malla curricular actualizada.</li>
                <li>Información sobre convenios y becas disponibles.</li>
                <li>Invitaciones a talleres y recorridos por laboratorios.</li>
                <li>Guía paso a paso para el examen de ingreso.</li>
              </ul>
            </div>

            <div className="mt-10 bg-white p-6 border-l-2 border-ups-yellow shadow-md">
              <p className="text-sm text-zinc-600 italic">
                "Nuestra misión es formar profesionales con excelencia académica y humana,
                líderes en la creación de soluciones tecnológicas innovadoras."
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-none shadow-xl p-5 sm:p-8 lg:p-10 relative overflow-hidden border border-zinc-100">
              <div className="absolute top-0 left-0 w-full h-2 bg-ups-yellow"></div>

              {submitted ? (
                <div className="text-center py-16">
                  <div className="size-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-ups-blue mb-3">¡Registro Exitoso!</h3>
                  <p className="text-zinc-600 mb-8">
                    Gracias por tu interés. Un asesor académico se pondrá en contacto contigo
                    a través de tu correo electrónico o teléfono muy pronto.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="px-8 py-3 bg-ups-blue text-white font-semibold uppercase hover:bg-ups-blue-light transition-colors"
                  >
                    Realizar otro registro
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                    <fieldset className="flex flex-col gap-y-6 transition-all duration-300">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-ups-blue uppercase tracking-tight">Formulario de Admisión</h3>
                        <p className="text-sm text-zinc-500">Por favor, completa todos los campos marcados con *</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                          <label htmlFor="nombre" className="block text-sm font-semibold text-zinc-700 mb-1.5 text-xs uppercase tracking-wider">Nombre completo *</label>
                          <input id="nombre" name="nombre" required type="text" placeholder="Ej. Juan Pérez" value={form.values.nombre} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                        </div>
                        <div>
                          <label htmlFor="telefono" className="block text-sm font-semibold text-zinc-700 mb-1.5 text-xs uppercase tracking-wider">Teléfono / WhatsApp *</label>
                          <input id="telefono" name="telefono" required type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="Ej. 09XXXXXXXX" value={form.values.telefono} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                          <label htmlFor="correo" className="block text-sm font-semibold text-zinc-700 mb-1.5 text-xs uppercase tracking-wider">Correo electrónico *</label>
                          <input id="correo" name="correo" required type="email" placeholder="correo@ejemplo.com" value={form.values.correo} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                        </div>
                        <div>
                          <label htmlFor="institucion" className="block text-sm font-semibold text-zinc-700 mb-1.5 text-xs uppercase tracking-wider">Colegio / Institución</label>
                          <input id="institucion" name="institucion" type="text" placeholder="Nombre de tu colegio" value={form.values.institucion} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                          <label htmlFor="evento" className="block text-sm font-semibold text-zinc-700 mb-1.5 text-xs uppercase tracking-wider">¿Dónde nos conociste? *</label>
                          <select id="evento" name="evento" required value={form.values.evento} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                            <option value="" disabled>Seleccionar opción</option>
                            <option value="Feria">Feria Educativa</option>
                            <option value="Recorrido UPS">Recorrido por la Universidad</option>
                            <option value="Redes sociales">Redes Sociales (FB/IG/TikTok)</option>
                            <option value="Visita a colegio">Visita a mi Colegio</option>
                            <option value="Otro">Otro medio</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="interes" className="block text-sm font-semibold text-zinc-700 mb-1.5 text-xs uppercase tracking-wider">Interés principal</label>
                          <select id="interes" name="interes" value={form.values.interes} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                            <option value="Información general">Información General</option>
                            <option value="Malla curricular">Malla Curricular</option>
                            <option value="Campo laboral">Campo Laboral / Salida Profesional</option>
                            <option value="Laboratorios">Laboratorios y Tecnología</option>
                            <option value="Admisión">Proceso de Admisión</option>
                            <option value="Becas">Becas y Ayudas Económicas</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="observaciones" className="block text-sm font-semibold text-zinc-700 mb-1.5 text-xs uppercase tracking-wider">¿Tienes alguna duda adicional?</label>
                        <textarea id="observaciones" name="observaciones" placeholder="Escribe aquí tu pregunta..." rows={3} value={form.values.observaciones} onChange={form.handleChange} onBlur={form.handleBlur} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:ring-2 focus:ring-ups-blue focus:bg-white outline-none transition-all resize-none"></textarea>
                      </div>

                      {state.status === 'error' && (
                        <div className="p-4 bg-red-50 border-l-2 border-red-500 text-red-700 text-sm">
                          {state.error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-ups-blue text-white font-semibold uppercase tracking-widest hover:bg-ups-blue-light transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {isSubmitting ? 'Enviando…' : (
                          <>
                            Enviar Solicitud
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </fieldset>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolicitudInformacion;
