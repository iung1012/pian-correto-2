/*
  # Restructure Product Descriptions to Markdown Format

  1. Changes
    - Convert all product descriptions from **Section:** format to ## SECTION format
    - Change bullet points from • to - for consistency
    - Ensure all products have proper markdown structure with sections
    
  2. Sections Converted
    - **Composição Básica:** → ## COMPOSIÇÃO BÁSICA
    - **Níveis de Garantia:** → ## NÍVEIS DE GARANTIA
    - **Diferenciais:** → ## DIFERENCIAIS
    - **Enriquecimento:** → ## ENRIQUECIMENTO MÍNIMO POR KG
    
  3. Products Affected
    - 34 products with incorrect structure format
    - All MIKDOG, MIKCAT, PATÊ, SACHÊ, TORNADO, ZECÃO, ZÉCAT, ZEQUINHA, ROOKIE, PRÓPEIXES products

  ## Important Notes
  - This migration makes descriptions consistent across all products
  - Products with ## format already correct are not modified
  - Bullet points changed from • to - for uniform rendering
*/

-- Update MIKDOG PREMIUM ESPECIAL ADULTO PEQUENO PORTE (ID 85)
UPDATE products 
SET description = '## DESCRIÇÃO
A ração para cães Mikdog Premium Especial Adulto Pequeno Porte pode ser encontrada no sabor frango e arroz e não tem adição de carne bovina, corantes ou aromatizantes. Disponível em embalagens de vários tamanhos, a ração Mikdog Premium Especial Adulto Pequeno Porte possui ainda proteína do ovo e tem alto valor biológico e nutricional. A fórmula da ração para cães Mikdog Premium Especial Adulto Pequeno Porte não tem substitutivos e é desenvolvida com ingredientes de qualidade.

## COMPOSIÇÃO BÁSICA
Farinha de vísceras de aves, milho integral, hidrolisado de fígado de aves e suínos, farelo de trigo, sebo de ruminantes, óleo de aves, arroz integral, farelo de soja (GM), farelo de glúten de milho, ovo desidratado, extrato de Yucca Schidigera, vitaminas e minerais.

## NÍVEIS DE GARANTIA
Proteína Bruta (mín.): 240 g | Extrato etéreo (mín.): 130 g | Matéria fibrosa (máx.): 35 g | Matéria mineral (máx.): 120 g | Cálcio (mín.): 10 g | Cálcio (máx.): 24 g | Fósforo (mín.): 12 g | Umidade (máx.): 200 g | Ômega 3 (mín.): 2.000 mg | Ômega 6 (mín.): 10 g | Energia metabolizável: 4.020 kcal/kg

## DIFERENCIAIS
- Livre de carne bovina
- Sem corantes e aromatizantes
- Embalagem biodegradável'
WHERE id = 85;

-- Create a function to batch update remaining products
DO $$
DECLARE
    product_record RECORD;
    new_desc TEXT;
BEGIN
    FOR product_record IN 
        SELECT id, description 
        FROM products 
        WHERE (description LIKE '%**Composição Básica:**%' OR description LIKE '%**Diferenciais:**%')
        AND id != 85
    LOOP
        -- Replace all formatting patterns
        new_desc := product_record.description;
        
        -- Replace bold section headers with markdown headers
        new_desc := REGEXP_REPLACE(new_desc, '\*\*Composição Básica:\*\*', '## COMPOSIÇÃO BÁSICA', 'gi');
        new_desc := REGEXP_REPLACE(new_desc, '\*\*Enriquecimento (Mínimo )?por KG:\*\*', '## ENRIQUECIMENTO MÍNIMO POR KG', 'gi');
        new_desc := REGEXP_REPLACE(new_desc, '\*\*Enriquecimento:\*\*', '## ENRIQUECIMENTO MÍNIMO POR KG', 'gi');
        new_desc := REGEXP_REPLACE(new_desc, '\*\*Níveis de Garantia:\*\*', '## NÍVEIS DE GARANTIA', 'gi');
        new_desc := REGEXP_REPLACE(new_desc, '\*\*Diferenciais:\*\*', '## DIFERENCIAIS', 'gi');
        
        -- Replace bullet points
        new_desc := REPLACE(new_desc, E'\n• ', E'\n- ');
        new_desc := REPLACE(new_desc, '• ', '- ');
        
        -- Update the product
        UPDATE products SET description = new_desc WHERE id = product_record.id;
    END LOOP;
END $$;
