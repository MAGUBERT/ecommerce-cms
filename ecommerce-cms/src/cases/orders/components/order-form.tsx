import { useParams } from "react-router-dom";
import { SidebarForm } from "@/components/layout/sidebar-form";
import { useEffect, useState } from "react";
import { useOrder, useUpdateOrder } from "../hooks/use-order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "../dtos/order.dto";


const formSchema = z.object({
  customerName: z.string().optional(),
  total: z.number().optional(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
});

export function OrderForm() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useOrder(id ?? "");
  const updateOrder = useUpdateOrder();

  const [updatingStatus, setUpdatingStatus] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      total: 0,
      status: "",
      createdAt: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        customerName: data.customer?.name ?? "",
        total: data.total ?? 0,
        status: data.status ?? "",
        createdAt: new Date(data.createdAt).toLocaleDateString("pt-BR"),
      });
    }
  }, [data, form]);

  function handleStatusChange(newStatus: string) {
    if (!id) return;
    setUpdatingStatus(true);

    updateOrder.mutate(
      { id, order: { ...data, status: newStatus } },
      {
        onSettled: () => {
          setUpdatingStatus(false);
        },
        onSuccess: () => {
          form.setValue("status", newStatus);
        },
      }
    );
  }

  return (
    <SidebarForm title="Detalhes do Pedido" loading={isLoading}>
      <Tabs defaultValue="geral" className="w-full">
        {/* Lista de abas */}
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="itens">Itens</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        {/* Aba Geral */}
        <TabsContent value="geral">
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Pedido</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        className="bg-muted"
                        value={field.value?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </TabsContent>

        {/* Aba Itens */}
        <TabsContent value="itens">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Qtd.</TableHead>
                  <TableHead className="text-right">Vlr Unit.</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.items && data.items.length > 0 ? (
                  data.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product?.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {item.value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(item.quantity * item.value).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Nenhum item encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Aba Status */}
        <TabsContent value="status">
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status do Pedido</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleStatusChange(value);
                      }}
                      value={field.value || ""}
                      disabled={updatingStatus || isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {OrderStatus.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </SidebarForm>
  );
}