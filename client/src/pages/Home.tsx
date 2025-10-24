import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { GanttChart } from "@/components/GanttChart";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "topic1" | "topic2" | "topic3" | "cronograma" | "responsaveis">("overview");

  // Fetch data from backend
  const { data: okrs1 } = trpc.okrs.getByTopic.useQuery({ topicId: 1 });
  const { data: okrs2 } = trpc.okrs.getByTopic.useQuery({ topicId: 2 });
  const { data: okrs3 } = trpc.okrs.getByTopic.useQuery({ topicId: 3 });
  const { data: cronogramaData } = trpc.cronograma.list.useQuery();
  const { data: responsaveisData } = trpc.responsaveis.list.useQuery();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">SUSpensão</CardTitle>
            <CardDescription className="text-center">Gestão de Projeto V4</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              "Nosso Risco, Sua Estabilidade. A nossa eficiência dirige seu resultado."
            </p>
            <Button asChild className="w-full bg-red-600 hover:bg-red-700">
              <a href={getLoginUrl()}>Fazer Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b-4 border-red-600 pb-4">
          <h1 className="text-3xl font-bold text-red-600">
            {activeTab === "overview" && "Visão Geral"}
            {activeTab === "topic1" && "Tópico 1: Variável"}
            {activeTab === "topic2" && "Tópico 2: Resultado"}
            {activeTab === "topic3" && "Tópico 3: STACK"}
            {activeTab === "cronograma" && "Cronograma"}
            {activeTab === "responsaveis" && "Responsáveis"}
          </h1>
        </div>

        {/* Overview Section */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Projeto SUSpensão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  <strong>Frase Guia:</strong> "Nosso Risco, Sua Estabilidade. A nossa eficiência dirige seu resultado."
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-red-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold text-red-600 uppercase">Projeto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold">SUSpensão</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold text-red-600 uppercase">Resultado Esperado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold">CHURN (Mitigação)</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold text-red-600 uppercase">Período</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold">Janeiro - Fevereiro 2025</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold text-red-600 uppercase">Responsáveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold">Vitor, Rafael, Luiz, David</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Topic 1 - Variável */}
        {activeTab === "topic1" && (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Tópico 1: Variável (Mitigação de Churn)</CardTitle>
                <CardDescription>Estratégia para converter clientes com potencial de churn para o modelo variável.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">OKRs (Resultados-Chave)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {okrs1?.map((okr) => (
                    <div key={okr.id} className="border-2 border-red-600 rounded-lg p-4 bg-red-50">
                      <p className="text-xs font-bold text-red-600 uppercase mb-2">KR{okr.krNumber}</p>
                      <p className="text-sm font-medium text-gray-800">{okr.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Topic 2 - Resultado */}
        {activeTab === "topic2" && (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Tópico 2: Resultado do Cliente (Performance)</CardTitle>
                <CardDescription>Controle e otimização da performance dos clientes com foco em resultados mensuráveis.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">OKRs (Resultados-Chave)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {okrs2?.map((okr) => (
                    <div key={okr.id} className="border-2 border-red-600 rounded-lg p-4 bg-red-50">
                      <p className="text-xs font-bold text-red-600 uppercase mb-2">KR{okr.krNumber}</p>
                      <p className="text-sm font-medium text-gray-800">{okr.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Topic 3 - STACK */}
        {activeTab === "topic3" && (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Tópico 3: STACK (Eficiência Operacional)</CardTitle>
                <CardDescription>Implementação de ferramentas e processos para otimizar a eficiência operacional com IA.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">OKRs (Resultados-Chave)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {okrs3?.map((okr) => (
                    <div key={okr.id} className="border-2 border-red-600 rounded-lg p-4 bg-red-50">
                      <p className="text-xs font-bold text-red-600 uppercase mb-2">KR{okr.krNumber}</p>
                      <p className="text-sm font-medium text-gray-800">{okr.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Cronograma */}
        {activeTab === "cronograma" && (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Cronograma (Gráfico de Gantt)</CardTitle>
                <CardDescription>Timeline visual das atividades do projeto com dependências e durações.</CardDescription>
              </CardHeader>
              <CardContent>
                {cronogramaData && cronogramaData.length > 0 ? (
                  <GanttChart activities={cronogramaData} />
                ) : (
                  <p className="text-gray-500">Nenhuma atividade cadastrada</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Responsáveis */}
        {activeTab === "responsaveis" && (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="text-red-600">Matriz de Responsáveis</CardTitle>
                <CardDescription>Atribuições, prazos e status de cada atividade do projeto.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-red-600 text-white">
                        <th className="px-4 py-2 text-left">Atividade</th>
                        <th className="px-4 py-2 text-left">Responsável</th>
                        <th className="px-4 py-2 text-left">Período</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {responsaveisData?.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{item.activityName}</td>
                          <td className="px-4 py-2">{item.responsible}</td>
                          <td className="px-4 py-2">{item.periodStart} - {item.periodEnd}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              item.status === "Em Progresso" ? "bg-yellow-100 text-yellow-800" :
                              item.status === "Planejado" ? "bg-blue-100 text-blue-800" :
                              "bg-green-100 text-green-800"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            Visão Geral
          </Button>
          <Button
            variant={activeTab === "topic1" ? "default" : "outline"}
            onClick={() => setActiveTab("topic1")}
            className={activeTab === "topic1" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            Variável
          </Button>
          <Button
            variant={activeTab === "topic2" ? "default" : "outline"}
            onClick={() => setActiveTab("topic2")}
            className={activeTab === "topic2" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            Resultado
          </Button>
          <Button
            variant={activeTab === "topic3" ? "default" : "outline"}
            onClick={() => setActiveTab("topic3")}
            className={activeTab === "topic3" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            STACK
          </Button>
          <Button
            variant={activeTab === "cronograma" ? "default" : "outline"}
            onClick={() => setActiveTab("cronograma")}
            className={activeTab === "cronograma" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            Cronograma
          </Button>
          <Button
            variant={activeTab === "responsaveis" ? "default" : "outline"}
            onClick={() => setActiveTab("responsaveis")}
            className={activeTab === "responsaveis" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            Responsáveis
          </Button>
          <Button variant="ghost" onClick={logout} className="ml-auto">
            Logout
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

