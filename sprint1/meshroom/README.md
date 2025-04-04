## Relatório Técnico: Primeiros Testes com o Meshroom

### Introdução
Este relatório é o resultado da tarefa **Estudo do Meshroom** (ver [Sprint 6](https://trello.com/c/taFKBR5z/10-sprint-6) e [Meshroom ](https://trello.com/c/hrnGGOq1/9-meshroom) do grupo 2024-2). Para a realização dessa tarefa, foi feito inicialmente um estudo da documentação da equipe do semestre passado (2024.2).

A partir desses estudos, foram feitos testes com a ferramenta. A seguir, serão apresentados os resultados iniciais da aplicação do software Meshroom em um processo de fotogrametria. O objeto utilizado para o experimento foi uma maçã, fotografada em ambiente interno durante o período noturno. O objetivo foi reconstruir a maçã em 3D a partir de um conjunto de imagens capturadas com uma câmera *Sony αRII full frame*.

### Parâmetros de Captura
Abaixo estão listadas as configurações da câmera utilizadas na sessão de captura:

| Parâmetro               | Valor                    |
|-------------------------|--------------------------|
| Câmera                 | Sony αRII               |
| Formato das imagens     | JPG                      |
| Distância focal   | 28mm                      |
| Abertura do diafragma   | f/6.3                      |
| ISO                     | 20.000 |
| Iluminação             | Artificial (ambiente interno, noturno) |

### Metodologia
Foram capturadas **83 fotografias** da maçã, e destas, **82 foram aproveitadas** no processo de *StructureFromMotion* (SfM), como mostra a interface do Meshroom:

![Interface do Meshroom - Estrutura](/sprint1/meshroom/imgs/estruturas_criadas.png)

*Figura 1 - Interface do Meshroom mostrando os resultados do StructureFromMotion.*

O processo de reconstrução gerou uma nuvem de **15.655 pontos**, que serviu como base para os passos seguintes: *Meshing*, *MeshFiltering* e *Texturing*.

![Distribuição das câmeras e pontos](/sprint1/meshroom/imgs/estrutura.png)

*Figura 2 - Posicionamento das câmeras virtuais em torno do objeto.*

As faces geradas durante o *meshing* foram:
- **560.247** no total
- Com **3 patches** aplicados durante a primeira texturização.

![Estrutura a partir dos processos de StructureFromMotion](/sprint1/meshroom/imgs/estrutura2.png)

*Figura 3 - Configurações automáticas dos nodes levaram a essa estrutura.*

### Resultados
As imagens a seguir mostram a reconstrução tridimensional do objeto:

#### Vista Superior
![Topo da maçã com caule danificado](/sprint1/meshroom/imgs/textura_problemas(1).png)

*Figura 4 - Falha na região superior do caule da maçã.*

#### Vista Lateral
![Lado da maçã com textura rugosa](/sprint1/meshroom/imgs/textura_problemas.png)

*Figura 5 - Textura lateral com imperfeições e rugosidade exagerada.*

#### Vista Frontal
![Maçã sobre fundo reconstruído](/sprint1/meshroom/imgs/textura.png)

*Figura 6 - Modelo 3D frontal com fundo de referência da cena.*

#### Pontos e reconstrução 3D parcial
![Distribuição de pontos no espaço 3D](/sprint1/meshroom/imgs/estrutura2.png)

*Figura 7 - Pontos 3D ao redor do modelo reconstruído.*

#### Visualização da estrutura geral da nuvem de pontos
![Estrutura 3D completa com câmeras e pontos](/sprint1/meshroom/imgs/estruturas_criadas.png)

*Figura 8 - Mapa geral com posicionamento das câmeras e estrutura 3D.*

### Problemas Identificados
Durante o processo, foram observadas as seguintes falhas:

1. **Textura irreal e rugosa**: a representação final da superfície da maçã não condiz com a textura real da fruta.

   ![Textura rugosa](/sprint1/meshroom/imgs/textura_problemas.png)
   *Figura 9 - Textura gerada com inconsistências na superfície da maçã.*

2. **Caule incompleto**: o talo da maçã ficou com parte faltando, possivelmente por ausência de informação suficiente em algumas fotos.

3. **Qualidade das fotos comprometida**:
   - Capturadas à noite
   - Iluminação artificial
   - ISO alto
   - Arquivos em JPG (em vez de RAW)

4. **Abertura da lente**: as fotos foram feitas com abertura f/6.3, mas há indicações de que f/8 geraria resultados mais nítidos.

5. **Distância de foco mínimo**: a lente utilizada exige 28 cm de distância do objeto, o que pode ter limitado o detalhamento. É sugerido realizar uma *cropagem* padronizada nas imagens para aproximação virtual.

### Considerações Finais
Apesar das dificuldades, o Meshroom se mostrou uma ferramenta intuitiva, mesmo com a utilização de suas configurações padrão. O projeto já demonstra um bom ponto de partida.

Os próximos passos serão:
- Repetir a sessão de fotos com condições otimizadas
- Testar captura em RAW
- Ajustar ISO e abertura
- Considerar um pré-processamento com cropagem uniforme

### Fontes e Referências
- Documentação oficial Meshroom / Sketchfab: https://meshroom-manual.readthedocs.io/en/latest/tutorials/sketchfab/sketchfab.html
- Tutorial Meshroom Sketchfab (YouTube): https://www.youtube.com/watch?v=j3lhPKF8qjU
- Meshroom passo a passo (YouTube): https://www.youtube.com/watch?v=jI7nd2EQW1w
