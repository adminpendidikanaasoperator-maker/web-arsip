FROM nginx:alpine

# Copy all web files to nginx html directory
COPY . /usr/share/nginx/html

# Copy custom nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
