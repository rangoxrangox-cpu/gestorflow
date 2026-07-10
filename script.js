/**
 * GestorFlow - Premium SaaS Interactions
 * Handles checkout URL injection, mobile CTA logic, and smooth scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. URL Injection & Checkout Activation
    const setupCheckoutLinks = () => {
        // Obter URL base do config.js
        const baseUrl = window.GESTORFLOW_CONFIG?.checkoutUrl?.trim() || "";
        
        if (!baseUrl) {
            console.error("GestorFlow: URL de checkout não configurada no config.js");
            return;
        }

        try {
            const url = new URL(baseUrl);
            if (url.hostname !== "pay.kiwify.com.br") {
                console.warn("GestorFlow: Domínio de checkout não padrão identificado.");
            }

            // Selecionar todos os botões de checkout na página
            const salesButtons = document.querySelectorAll('.checkout-btn-sales');
            const toolButtons = document.querySelectorAll('.checkout-btn-tool');

            // Configurar botões da Página de Vendas
            salesButtons.forEach(btn => {
                const salesUrl = new URL(url.toString());
                salesUrl.searchParams.set('utm_source', 'pagina_vendas');
                salesUrl.searchParams.set('utm_medium', 'organico');
                salesUrl.searchParams.set('utm_campaign', 'gestorflow_lancamento');
                
                btn.href = salesUrl.toString();
                btn.textContent = "Quero organizar minha operação por R$ 47";
                btn.classList.remove('disabled');
                btn.removeAttribute('disabled');
            });

            // Configurar botões da Ferramenta Gratuita
            toolButtons.forEach(btn => {
                const toolUrl = new URL(url.toString());
                toolUrl.searchParams.set('utm_source', 'ferramenta_gratuita');
                toolUrl.searchParams.set('utm_medium', 'html');
                toolUrl.searchParams.set('utm_campaign', 'gestorflow_lancamento');
                
                btn.href = toolUrl.toString();
                btn.textContent = "Quero organizar minha operação por R$ 47";
                btn.classList.remove('disabled');
                btn.removeAttribute('disabled');
            });

        } catch (e) {
            console.error("GestorFlow: Erro ao construir URL de checkout.", e);
        }
    };

    // Executa a injeção
    setupCheckoutLinks();

    // 2. Fixed Mobile CTA Logic
    const mobileCta = document.getElementById('mobile-cta');
    const heroSection = document.querySelector('.hero-section');

    if (mobileCta && heroSection) {
        window.addEventListener('scroll', () => {
            // Mostrar a barra apenas se o usuário rolou além da hero section
            // e se estiver em tela de celular (< 768px)
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
            const cliente = document.getElementById('nome-cliente')?.value || 'Cliente';
            const niched = document.getElementById('nicho-cliente')?.value || 'Geral';
            
            const resultDiv = document.getElementById('resultado-checklist');
            
            const checklistHTML = `
                <div style="background: var(--bg-card); padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid var(--border-color);">
                    <h3 style="color: var(--accent-cyan); margin-bottom: 15px;">Checklist de Onboarding: ${cliente} (${niched})</h3>
                    <ul style="list-style: none; text-align: left; padding: 0;">
                        <li style="margin-bottom: 10px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 10px;"> Assinatura do Contrato</li>
                        <li style="margin-bottom: 10px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 10px;"> Pagamento do Setup</li>
                        <li style="margin-bottom: 10px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 10px;"> Reunião de Briefing Executada</li>
                        <li style="margin-bottom: 10px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 10px;"> Acesso ao Gerenciador de Negócios (Meta/Google)</li>
                        <li style="margin-bottom: 10px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 10px;"> Pixel e API de Conversão instalados</li>
                        <li style="margin-bottom: 10px; color: var(--text-primary);"><input type="checkbox" style="margin-right: 10px;"> Criação do Grupo de WhatsApp (Suporte)</li>
                    </ul>
                    <button class="btn btn-secondary mt-4" onclick="window.print()">Imprimir Checklist</button>
                </div>
            `;
            
            resultDiv.innerHTML = checklistHTML;
        });
    }
});
