import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  posted: string;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Курьер на автомобиле',
    company: 'Delivery Express',
    location: 'Москва',
    salary: '80 000 - 120 000 ₽',
    type: 'Полная занятость',
    description: 'Требуется курьер с личным автомобилем для доставки заказов по городу',
    posted: '2 дня назад'
  },
  {
    id: 2,
    title: 'Пеший курьер',
    company: 'FastFood Delivery',
    location: 'Санкт-Петербург',
    salary: '60 000 - 90 000 ₽',
    type: 'Частичная занятость',
    description: 'Ищем активных курьеров для доставки еды в центре города',
    posted: '1 день назад'
  },
  {
    id: 3,
    title: 'Курьер на велосипеде',
    company: 'EcoCourier',
    location: 'Москва',
    salary: '70 000 - 100 000 ₽',
    type: 'Полная занятость',
    description: 'Экологичная доставка на велосипеде. Предоставляем оборудование',
    posted: '3 дня назад'
  },
  {
    id: 4,
    title: 'Курьер-водитель',
    company: 'Logistics Pro',
    location: 'Екатеринбург',
    salary: '90 000 - 130 000 ₽',
    type: 'Полная занятость',
    description: 'Требуется опытный водитель категории B для межгородских доставок',
    posted: '5 дней назад'
  },
  {
    id: 5,
    title: 'Курьер на скутере',
    company: 'Quick Delivery',
    location: 'Казань',
    salary: '65 000 - 95 000 ₽',
    type: 'Полная занятость',
    description: 'Доставка посылок на скутере. Предоставляем транспорт и топливо',
    posted: '1 неделю назад'
  },
  {
    id: 6,
    title: 'Вечерний курьер',
    company: 'Night Express',
    location: 'Москва',
    salary: '75 000 - 110 000 ₽',
    type: 'Частичная занятость',
    description: 'Работа в вечернее время с 18:00 до 23:00. Повышенные ставки',
    posted: '4 дня назад'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(mockJobs.length / itemsPerPage);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') return a.id - b.id;
    if (sortBy === 'salary') return parseInt(b.salary) - parseInt(a.salary);
    return 0;
  });

  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Package" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">COURIER JOBS</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Вакансии
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                О компании
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </a>
            </nav>
            <Button variant="outline" className="hidden md:inline-flex gap-2 border-primary text-primary hover:bg-primary hover:text-white">
              <Icon name="Plus" size={18} />
              Разместить вакансию
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-3">
            Найдите работу курьера
          </h2>
          <p className="text-lg text-muted-foreground">
            Более 500 актуальных вакансий от проверенных работодателей
          </p>
        </div>

        <div className="mb-8 bg-white rounded-lg border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск вакансий..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <Icon name="MapPin" size={18} className="mr-2 text-muted-foreground" />
                <SelectValue placeholder="Город" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все города</SelectItem>
                <SelectItem value="Москва">Москва</SelectItem>
                <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                <SelectItem value="Екатеринбург">Екатеринбург</SelectItem>
                <SelectItem value="Казань">Казань</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <Icon name="Briefcase" size={18} className="mr-2 text-muted-foreground" />
                <SelectValue placeholder="Тип занятости" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="Полная занятость">Полная занятость</SelectItem>
                <SelectItem value="Частичная занятость">Частичная занятость</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Filter" size={18} />
              <span>Найдено вакансий: {filteredJobs.length}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Сортировка:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Сначала новые</SelectItem>
                  <SelectItem value="salary">По зарплате</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {paginatedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Package" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Icon name="Wallet" size={16} />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {job.posted}
                  </span>
                  <Button size="sm">
                    Откликнуться
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="mt-16 bg-white rounded-lg border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            О работе курьером
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p className="mb-4">
              Работа курьером — один из самых востребованных видов занятости в современных городах. 
              Курьеры играют ключевую роль в логистической цепочке, обеспечивая быструю доставку товаров и документов.
            </p>
            <p className="mb-4">
              На нашем сайте представлены вакансии от проверенных компаний с прозрачными условиями работы. 
              Мы предлагаем различные форматы занятости: от полного рабочего дня до гибкого графика.
            </p>
            <p>
              Средняя заработная плата курьера составляет от 60 000 до 130 000 рублей в месяц, 
              в зависимости от города, типа транспорта и интенсивности работы.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Package" size={28} className="text-primary" />
                <span className="font-bold text-lg">COURIER JOBS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ведущая платформа поиска работы для курьеров и водителей
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Для соискателей</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Поиск вакансий</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Создать резюме</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Советы по поиску</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Для работодателей</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Разместить вакансию</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">База резюме</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:info@courierjobs.ru" className="hover:text-primary transition-colors">
                    info@courierjobs.ru
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+78001234567" className="hover:text-primary transition-colors">
                    8 (800) 123-45-67
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Courier Jobs. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;