-- Seed OKRs for Topic 1
INSERT INTO okrs (topicId, krNumber, description) VALUES
(1, 1, 'Converter 50% dos clientes com potencial de churn para o modelo variável até o fim do Q1'),
(1, 2, 'Fechar 5 novos clientes em nichos (E-commerce/Delivery) já no modelo variável até o fim do Q1'),
(1, 3, 'Atingir 80% de satisfação em modelo variável até o final de Janeiro');

-- Seed OKRs for Topic 2
INSERT INTO okrs (topicId, krNumber, description) VALUES
(2, 1, 'Manter Bandeira Verde acima de 50% da carteira'),
(2, 2, 'Atingir 100% de conformidade no preenchimento semanal'),
(2, 3, 'Realizar 3 sessões de benchmarking');

-- Seed OKRs for Topic 3
INSERT INTO okrs (topicId, krNumber, description) VALUES
(3, 1, 'Mapear 100% das ferramentas V4 e 3 ferramentas de mercado'),
(3, 2, 'Implementar 1 ferramenta de IA (redução de 30% no tempo)'),
(3, 3, 'Padronizar 100% dos processos da STACK');

-- Seed Cronograma Activities
INSERT INTO cronogramaActivities (topicId, activityName, startDate, durationDays) VALUES
(1, 'Mapear clientes (churn)', '01/01', 14),
(1, 'Estruturar oferta variável', '15/01', 14),
(1, 'Iniciar prospecção (nichos)', '22/01', 21),
(2, 'Definir KPIs padrão', '08/01', 7),
(2, 'Criar template Planilha', '15/01', 14),
(2, 'Levantar histórico (mês)', '15/01', 14),
(2, 'Iniciar controle semanal', '01/02', 14),
(2, 'Agendar Benchmarking', '01/01', 14),
(3, 'Mapear Ferramentas', '01/01', 14),
(3, 'Definir escopo SDR IA', '08/01', 14),
(3, 'Reunião Alinhamento STACK', '01/01', 7),
(3, 'Implementar IA (Piloto)', '22/01', 21);

-- Seed Responsáveis
INSERT INTO responsaveis (activityName, responsible, periodStart, periodEnd, status) VALUES
('Mapear clientes (churn)', 'Vitor', '01/01', '14/01', 'Em Progresso'),
('Estruturar oferta variável', 'Vitor', '15/01', '28/01', 'Planejado'),
('Iniciar prospecção (nichos)', 'Rafael', '22/01', '12/02', 'Planejado'),
('Definir KPIs padrão', 'Luiz', '08/01', '14/01', 'Em Progresso'),
('Criar template Planilha', 'Luiz', '15/01', '28/01', 'Planejado'),
('Levantar histórico (mês)', 'David', '15/01', '28/01', 'Planejado'),
('Iniciar controle semanal', 'David', '01/02', '14/02', 'Planejado'),
('Agendar Benchmarking', 'Vitor', '01/01', '14/01', 'Em Progresso'),
('Mapear Ferramentas', 'Luiz', '01/01', '14/01', 'Em Progresso'),
('Definir escopo SDR IA', 'Luiz', '08/01', '21/01', 'Planejado'),
('Reunião Alinhamento STACK', 'Rafael', '01/01', '07/01', 'Concluído'),
('Implementar IA (Piloto)', 'Luiz', '22/01', '12/02', 'Planejado');
