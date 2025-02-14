# Deployment Guide for newsletter.chat

## Prerequisites
- Linux VPS with Ubuntu/Debian
- Domain (newsletter.chat) with DNS configured
- Node.js 16+ and npm
- PM2 for process management
- Supabase account for database

## Server Setup

1. Update system and install required packages:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install apache2 certbot python3-certbot-apache nodejs npm -y
```

2. Enable required Apache modules:
```bash
sudo a2enmod ssl
sudo a2enmod headers
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo systemctl restart apache2
```

3. Install PM2 globally:
```bash
sudo npm install -g pm2
```

## SSL Certificate Setup

1. Get SSL certificate:
```bash
sudo certbot --apache -d newsletter.chat -d www.newsletter.chat
```

## Database Setup (Supabase)

1. Create a new project in Supabase:
   - Go to https://app.supabase.com
   - Create a new project
   - Note down the project URL and anon key

2. Initialize database schema:
   - Go to SQL editor in Supabase dashboard
   - Run the SQL commands from README.md to create tables
   - Set up row level security (RLS) policies

3. Update environment variables:
```bash
# In your .env file
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Systemd Service Setup

1. Create systemd service file:
```bash
sudo cp newsletter-chat.service /etc/systemd/system/
sudo chmod 644 /etc/systemd/system/newsletter-chat.service
```

2. Enable and start the service:
```bash
sudo systemctl enable newsletter-chat
sudo systemctl start newsletter-chat
```

3. Check service status:
```bash
sudo systemctl status newsletter-chat
```

## Application Deployment

1. Create application directory:
```bash
sudo mkdir -p /var/www/newsletter.chat
sudo chown -R $USER:$USER /var/www/newsletter.chat
```

2. Clone and build the application:
```bash
cd /var/www/newsletter.chat
git clone https://github.com/yourusername/newsletter.chat.git .
npm install
npm run build
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your production values
nano .env
```

4. Start the application with PM2:
```bash
pm2 start npm --name "newsletter-chat" -- start
pm2 save
pm2 startup
```

## Apache Configuration

1. Copy Apache configuration:
```bash
sudo cp newsletter.chat.conf /etc/apache2/sites-available/newsletter.chat.conf
```

2. Enable the site:
```bash
sudo a2ensite newsletter.chat.conf
sudo a2dissite 000-default.conf
sudo systemctl restart apache2
```

## Final Steps

1. Test the configuration:
```bash
sudo apache2ctl configtest
```

2. Restart Apache:
```bash
sudo systemctl restart apache2
```

3. Set up automatic SSL renewal:
```bash
sudo certbot renew --dry-run
```

## Maintenance

- Monitor logs:
	```bash
	sudo tail -f /var/log/apache2/newsletter.chat-error.log
	pm2 logs newsletter-chat
	```

- Update application:
	```bash
	cd /var/www/newsletter.chat
	git pull
	npm install
	npm run build
	pm2 restart newsletter-chat
	```

## Security Recommendations

1. Configure UFW firewall:
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

2. Set up fail2ban:
```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

3. Regular system updates:
```bash
sudo apt update && sudo apt upgrade -y
```

## Troubleshooting

- Check Apache error logs:
    ```bash
    sudo tail -f /var/log/apache2/error.log
    ```

- Check application logs:
    ```bash
    pm2 logs
    ```

- Check systemd service logs:
    ```bash
    sudo journalctl -u newsletter-chat -f
    ```

- Test SSL configuration:
    ```bash
    curl -vI https://newsletter.chat
    ```

- Verify Apache configuration:
    ```bash
    sudo apache2ctl -t
    ```

- Restart the systemd service:
    ```bash
    sudo systemctl restart newsletter-chat
    ```