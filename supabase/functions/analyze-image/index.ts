import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, mode } = await req.json();

    if (!image) {
      return new Response(
        JSON.stringify({ error: "Imagem é obrigatória" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (mode) {
      case "ocr":
        systemPrompt = `Você é um especialista em OCR (Reconhecimento Óptico de Caracteres). 
Sua tarefa é extrair TODO o texto visível na imagem de forma precisa e organizada.
Mantenha a formatação original quando possível (listas, parágrafos, tabelas).
Se não houver texto visível, responda: "Nenhum texto encontrado na imagem."`;
        userPrompt = "Por favor, extraia todo o texto visível nesta imagem. Organize o texto de forma clara e mantenha a estrutura original quando possível.";
        break;

      case "ai":
      case "identify":
        systemPrompt = `Você é um biólogo especialista em identificação de espécies da fauna e flora brasileira.
Ao analisar uma imagem, você deve:
1. Identificar a espécie (nome popular e científico)
2. Classificar: Reino, Filo, Classe, Ordem, Família, Gênero, Espécie
3. Descrever características visíveis que ajudaram na identificação
4. Informar se é nativa ou exótica do Brasil
5. Status de conservação (se conhecido)
6. Curiosidades interessantes sobre a espécie
7. Habitat típico e distribuição geográfica

Se não conseguir identificar com certeza, indique as possibilidades mais prováveis.
Se a imagem não contiver uma espécie identificável, explique o que você vê.

Responda SEMPRE em português brasileiro.`;
        userPrompt = "Analise esta imagem e identifique a espécie presente. Forneça informações detalhadas conforme seu conhecimento de biólogo.";
        break;

      case "scan":
        systemPrompt = `Você é um assistente especializado em digitalização de documentos.
Sua tarefa é:
1. Identificar o tipo de documento (nota fiscal, recibo, carta, formulário, etc.)
2. Extrair todas as informações importantes de forma estruturada
3. Organizar os dados em categorias (datas, valores, nomes, endereços, etc.)
4. Corrigir possíveis erros de OCR com base no contexto`;
        userPrompt = "Por favor, digitalize este documento. Extraia e organize todas as informações importantes de forma estruturada.";
        break;

      default:
        systemPrompt = `Você é um assistente visual inteligente.
Descreva detalhadamente o que você vê na imagem.`;
        userPrompt = "O que você vê nesta imagem? Descreva com detalhes.";
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              {
                type: "image_url",
                image_url: { url: image }
              }
            ]
          }
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`Erro na API de IA: ${response.status}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "Não foi possível analisar a imagem.";

    return new Response(
      JSON.stringify({ result, mode }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error in analyze-image:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro ao analisar imagem";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
