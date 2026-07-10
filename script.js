/**
 * GestorFlow - Premium SaaS Interactions
 * Handles checkout URL injection, mobile CTA logic, and smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. URL Injection & Checkout Activation
    const setupCheckoutLinks = () => {
        const salesUrl = typeof getSalesCheckoutUrl === 'function' ? getSalesCheckoutUrl() : null;
        const toolUrl = typeof getToolCheckoutUrl === 'function' ? getToolCheckoutUrl() : null;

        const salesButtons = document.querySelectorAll('.checkout-btn-sales');
        const toolButtons = document.querySelectorAll('.checkout-btn-tool');

        if (salesUrl) {
            salesButtons.forEach(btn => {
                btn.href = salesUrl;
                btn.textContent = "Quero organizar minha operação por R$ 47";
                btn.classList.remove('disabled');
                btn.removeAttribute('disabled');
            });
        }

        if (toolUrl) {
            toolButtons.forEach(btn => {
                btn.href = toolUrl;
                btn.textContent = "Quero organizar minha operação por R$ 47";
                btn.classList.remove('disabled');
                btn.removeAttribute('disabled');
            });
        }
    };

    // Executa a injeção
    setupCheckoutLinks();

    // 2. Fixed Mobile CTA Logic
    const mobileCta = document.getElementById('mobile-cta');
    const heroSection = document.querySelector('.hero-section');

    if (mobileCta && heroSection) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768 && window.scrollY > heroSection.offsetHeight / 2) {
                mobileCta.classList.add('visible');
            } else {
                mobileCta.classList.remove('visible');
            }
        });
    }

    // 3. Checklist Generator (apenas para ferramenta.html)
    const btnGerar = document.getElementById('btn-gerar-checklist');
    if (btnGerar) {
        btnGerar.addEventListener('click', () => {
            const nomeInput = document.getElementById('nome-cliente');
            let cliente = nomeInput?.value?.trim();
            const niched = document.getElementById('nicho-cliente')?.value || 'Geral';
            
            if (!cliente) {
                alert("Por favor, preencha o nome do cliente antes de gerar o checklist.");
                nomeInput.focus();
                return;
            }
            
            const resultDiv = document.getElementById('resultado-checklist');
            
            const checklistHTML = `
                <div class="generated-checklist" style="background: var(--bg-card); padding: 30px; border-radius: 12px; margin-top: 24px; border: 1px solid var(--border-color); text-align: left;">
                    <h3 style="color: var(--accent-cyan); margin-bottom: 5px;">Checklist de Onboarding: ${cliente}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.9rem;">Segmento: ${niched}</p>

                    <ul style="list-style: none; padding: 0; margin-bottom: 30px;" id="checklist-list">
                        <li style="margin-bottom: 12px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 12px; accent-color: var(--accent-purple);"> Contrato ou acordo comercial confirmado</li>
                        <li style="margin-bottom: 12px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 12px; accent-color: var(--accent-purple);"> Pagamento inicial confirmado</li>
                        <li style="margin-bottom: 12px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 12px; accent-color: var(--accent-purple);"> Reunião de briefing realizada</li>
                        <li style="margin-bottom: 12px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 12px; accent-color: var(--accent-purple);"> Acessos às plataformas recebidos</li>
                        <li style="margin-bottom: 12px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 12px; accent-color: var(--accent-purple);"> Pixel e eventos de conversão verificados</li>
                        <li style="margin-bottom: 12px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 12px; accent-color: var(--accent-purple);"> Canal de comunicação definido</li>
                    </ul>

                    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                        <button type="button" class="btn btn-secondary" onclick="window.print()" style="padding: 10px 20px; font-size: 0.9rem;">
                            Imprimir checklist
                        </button>
                        <button type="button" class="btn btn-secondary" id="btn-copy" style="padding: 10px 20px; font-size: 0.9rem;">
                            Copiar Texto
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('resultado-checklist').innerHTML = '';" style="padding: 10px 20px; font-size: 0.9rem; border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;">
                            Gerar Novamente
                        </button>
                    </div>
                </div>
            `;
            
            resultDiv.innerHTML = checklistHTML;

            const copyBtn = document.getElementById('btn-copy');
            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    const textToCopy = `Checklist de Onboarding: ${cliente} (${niched})\n\n[ ] Contrato ou acordo comercial confirmado\n[ ] Pagamento inicial confirmado\n[ ] Reunião de briefing realizada\n[ ] Acessos às plataformas recebidos\n[ ] Pixel e eventos de conversão verificados\n[ ] Canal de comunicação definido`;
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalText = copyBtn.innerText;
                        copyBtn.innerText = "Copiado!";
                        copyBtn.style.color = "var(--accent-green)";
                        copyBtn.style.borderColor = "var(--accent-green)";
                        setTimeout(() => {
                            copyBtn.innerText = originalText;
                            copyBtn.style.color = "";
                            copyBtn.style.borderColor = "";
                        }, 2000);
                    });
                });
            }
        });
    }
});
