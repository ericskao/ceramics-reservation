# The main domain, this might be different per environment
domain = 'localhost'

# These subdomains are not trusted and should not be allowed to authenticate with cookies
cors_third_party_subdomains = [
    'blog',
    'shop',
    'support'
].join('|')

# These are the Rack::Cors settings that we want to set, first for all domains and then for trusted ones
cors_headers = {
    :headers => :any,
    :methods => [:get, :post, :put, :delete, :options, :patch],
    :expose => %w(Link),
    :credentials => false
}
cors_headers_internal = cors_headers.merge({:credentials => true})

# This is the actual Rack::Cors configuration
Rails.application.config.middleware.insert_before 0, Rack::Cors do
    # Third party subdomains should not get cookies in case of XSS
    allow do
        origins /^https:\/\/(#{cors_third_party_subdomains})\.#{domain}$/
        resource '*', cors_headers
    end

    # We only want allow-credentials to be true for our own requests
    # Otherwise you'll need to supply or other non-cookie credentials
    allow do
    origins /^https:\/\/(|[^.]+\.)#{domain}$/
    resource '*', cors_headers_internal
    end

    # All other requests made over https allow CORS without credentials
    allow do
    origins /^https:\/\//
    resource '*', cors_headers
    end

    # Allow connections from localhost on non-prod environments as internal requests
    unless Rails.env.production?
        allow do
            origins /^(https?:\/\/)?localhost(:\d+)?$/
            resource '*', cors_headers_internal
        end
    end
end
